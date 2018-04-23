def GenerateEtymology(dictionary):
    chsnum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
    for entry in dictionary.entries:
        if entry.source:
            entry.etymology = ""
            ground = entry.source[-1][2]
            for src in entry.source:
                if src[0] in ["引申", "缩写", "替换"]:
                    entry.etymology += "%s自%s「%s」；" % (src[0], "大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] in ["拼音", "谐音", "同近义词"]:
                    entry.etymology += "取自%s%s「%s」；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[0], src[1].replace('_', ' '))
                elif src[0] == "功用":
                    entry.etymology += "取自功用「%s」；" % (src[1].replace('_', ' '))
                elif src[0] == "分隔符":
                    entry.etymology += "%s「%s」加入分隔符而来；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] == "形近字":
                    entry.etymology += "%s「%s」使用形近字替换而来；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] == "其他语言":
                    entry.etymology += "取自其他语言%s「%s」；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
            entry.etymology = entry.etymology[:-1] + "。"
        else:
            entry.etymology = "暂无收录。"
    return dictionary


def GenerateUsage(dictionary):
    for entry in dictionary.entries:
        entry.usage = "；".join(entry.s_usage) if entry.usage else "暂无收录。"
    return dictionary


def GenerateSameMeaning(dictionary):
    for entry in dictionary.entries:
        entry.synonym = "；".join(entry.same)  if entry.same else "暂无收录。"
    return dictionary


def GenerateCloseMeaning(dictionary):
    return dictionary


def GenerateIndex(dictionary):
    return ""


def GenerateFullText(dictionary):
    dictionary = GenerateEtymology(dictionary)
    dictionary = GenerateSameMeaning(dictionary)
    dictionary = GenerateCloseMeaning(dictionary)
    dictionary = GenerateUsage(dictionary)

    result = ""
    for i, entry in enumerate(dictionary.entries):
        print("%d %s\n【释义】%s\n【词源】%s\n【语用】%s\n【同义】%s\n" % (
            i,
            entry.name,
            entry.explanation,
            entry.etymology,
            entry.usage,
            entry.synonym))

    return result