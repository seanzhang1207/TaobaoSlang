import argparse

from parse_xlsx import ParseXLSX
from trace_entries import GenerateDynamicContent
from gen_text import GenerateFullText

parser = argparse.ArgumentParser(
    formatter_class=argparse.RawDescriptionHelpFormatter,
    description="""\
Generates content of slang dictionary. Follows three steps:
1. Parse the input xlsx file to construct entries. See parse_xlsx.py.
2. Trace entries to generate dynamic content. See trace_entries.py.
3. Format entries to generate final text. See gen_text.py
"""
)
parser.add_argument('xlsx_file', type=str)

args = parser.parse_args()
# wb = load_workbook(sys.argv[1])

dictionary = ParseXLSX(args.xlsx_file)

print(len(dictionary.query(source=lambda x: x is not None)))

# print(len(dictionary.query(name=lambda x: x is not None)))

dictionary = GenerateDynamicContent(dictionary)
print(len(dictionary.query(source=lambda x: x is not None)))

GenerateFullText(dictionary)


