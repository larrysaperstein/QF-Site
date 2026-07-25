#!/usr/bin/env python3
"""
Regenerates src/data/show-credits.json from public/spreadsheet/Quick & Funny Show Credits.xlsx.
Run after updating the spreadsheet, or edit show-credits.json directly for small changes.
"""
import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
XLSX_PATH = ROOT / 'public/spreadsheet/Quick & Funny Show Credits.xlsx'
OUTPUT_PATH = ROOT / 'src/data/show-credits.json'

SHEET_TO_SLUG = {
    'Heated Rivalry The Musical Paro': 'heated-rivalry',
    'White Lotus': 'white-lotus',
    'Hot Love Mansion of Love': 'hlml',
    'Other Cats': 'other-cats',
    'Kids Save World': 'ksw',
    'Meet Cute': 'meet-cute',
    'Go Thank Yourself': 'go-thank-yourself',
    'Period Piece': 'period-piece',
    'Queer As Folk Songs': 'queer-as-folk-songs',
    'Mall Wars': 'mall-wars',
    'Yes Chef!': 'yes-chef',
    'Once Upon A Crime': 'special-princess-unit',
    'A Picket Line': 'a-picket-line',
    'Tik Tok Timeloop': 'tiktok-time-loop',
}


CREW_ROLE_PLURALS = {
    'Head Writer': 'Head Writers',
    'Director': 'Directors',
    'Co-Director': 'Co-Directors',
    'Producer': 'Producers',
    'Assistant Director': 'Assistant Directors',
    'Music Director': 'Music Directors',
    'Technical Director': 'Technical Directors',
    'Assistant Technical Director': 'Assistant Technical Directors',
    'Costume Designer': 'Costume Designers',
}


def format_role(role: str, count: int) -> str:
    if role.upper() == 'BAND':
        return 'Band'
    if '(s)' in role:
        base = role.replace('(s)', '').strip()
        return base if count == 1 else f'{base}s'
    if count < 2:
        if role == 'Head Writers':
            return 'Head Writer'
        return role
    if role == 'Band' or role.upper() == 'BAND':
        return 'Band'
    if role.endswith('s'):
        return role
    return CREW_ROLE_PLURALS.get(role, f'{role}s')


def process_crew(raw_crew):
    processed = []
    band_people = []

    for entry in raw_crew:
        role = entry['role']
        people = entry['people']
        if role.upper() == 'BAND' or role == 'Band':
            band_people.extend(people)
            continue
        if band_people:
            processed.append({'role': 'Band', 'people': band_people, 'layout': 'stacked'})
            band_people = []
        processed.append({
            'role': format_role(role, len(people)),
            'people': people,
            'layout': 'inline',
        })

    if band_people:
        processed.append({'role': 'Band', 'people': band_people, 'layout': 'stacked'})

    return processed


def col_row(ref):
    match = re.match(r'([A-Z]+)(\d+)', ref)
    return match.group(1), int(match.group(2))


def read_workbook(path: Path):
    with zipfile.ZipFile(path) as archive:
        workbook = ET.fromstring(archive.read('xl/workbook.xml'))
        ns = {
            'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
            'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
        }
        sheets = [
            (
                sheet.get('name'),
                sheet.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'),
            )
            for sheet in workbook.findall('.//main:sheet', ns)
        ]

        relationships = ET.fromstring(archive.read('xl/_rels/workbook.xml.rels'))
        id_to_target = {
            rel.get('Id'): rel.get('Target')
            for rel in relationships.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')
        }

        shared = []
        if 'xl/sharedStrings.xml' in archive.namelist():
            shared_strings = ET.fromstring(archive.read('xl/sharedStrings.xml'))
            for item in shared_strings.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                texts = [
                    text.text or ''
                    for text in item.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
                ]
                shared.append(''.join(texts))

        def read_sheet(target):
            sheet_xml = ET.fromstring(archive.read('xl/' + target.lstrip('/')))
            rows = {}
            for cell in sheet_xml.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                ref = cell.get('r')
                column, row = col_row(ref)
                value_node = cell.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                if value_node is None or value_node.text is None:
                    value = ''
                elif cell.get('t') == 's':
                    value = shared[int(value_node.text)]
                else:
                    value = value_node.text
                rows.setdefault(row, {})[column] = value
            return rows

        credits = {}
        for sheet_name, sheet_id in sheets:
            slug = SHEET_TO_SLUG.get(sheet_name)
            if not slug:
                raise KeyError(f'No slug mapping for spreadsheet tab: {sheet_name}')

            rows = read_sheet(id_to_target[sheet_id])
            raw = {'crew': [], 'songs': [], 'cast': []}
            section = 'crew'

            for row_number in sorted(rows):
                row = rows[row_number]
                label = row.get('A', '').strip()
                if not label:
                    continue

                upper = label.upper()
                if upper == 'SONGS':
                    section = 'songs'
                    continue
                if upper == 'CAST':
                    section = 'cast'
                    continue

                people_columns = ['B', 'C', 'D', 'E', 'F', 'G', 'H']
                values = [row.get(column, '').strip() for column in people_columns if row.get(column, '').strip()]

                if section == 'crew':
                    raw['crew'].append({'role': label, 'people': values})
                elif section == 'songs':
                    raw['songs'].append({'title': label, 'writers': values})
                else:
                    raw['cast'].append({'character': label, 'actors': values})

            credits[slug] = {
                'crew': process_crew(raw['crew']),
                'songs': raw['songs'],
                'cast': raw['cast'],
            }

    return credits


def main():
    credits = read_workbook(XLSX_PATH)
    OUTPUT_PATH.write_text(json.dumps(credits, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'Wrote {len(credits)} show credits to {OUTPUT_PATH.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
