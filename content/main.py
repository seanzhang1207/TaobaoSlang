import argparse
import json
from dicttoxml import dicttoxml

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

fulltext = GenerateFullText(dictionary)


def js_list(encoder, data):
    pairs = []
    for v in data:
        pairs.append(js_val(encoder, v))
    return "[" + ", ".join(pairs) + "]"


def js_dict(encoder, data):
    pairs = []
    for k, v in data.items():
        pairs.append(k + ": " + js_val(encoder, v))
    return "{" + ", ".join(pairs) + "}"


def js_val(encoder, data):
    if isinstance(data, dict):
        val = js_dict(encoder, data)
    elif isinstance(data, list):
        val = js_list(encoder, data)
    else:
        val = encoder.encode(data)
    return val


encoder = json.JSONEncoder(ensure_ascii=False)
print(js_val(encoder, fulltext))


f = open("output.json", 'w')
f.write("content = ")
f.write(js_val(encoder, fulltext))
f.close()
