json_file1 = "C:/soft/git/mifomen.github.io/test/buh.json"
json_file2 = "C:/soft/git/mifomen.github.io/test/buh-all.json"

print("asdasd")
import json
import io
file = open(json_file1, encoding="utf8")
itemList = json.load(file)

print(type(itemList))

i = 0
for item in itemList:
  item['id'] = i
  i = i +1


with io.open(json_file2, 'w', encoding='utf-8') as f:
  f.write(json.dumps(itemList, indent=2, sort_keys=False,ensure_ascii=False))
