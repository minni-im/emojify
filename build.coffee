request = require 'request'

full_table = "http://www.unicode.org/~scherer/emoji4unicode/snapshot/full.html"

TR_REGEXP = /<tr id=e-[0-9a-fA-F]{3}>.*<\/tr>/ig


UNICODE_ID = />(e-[0-9a-fA-F]{3})</

UNIFIED_CHAR = /<span class='unified'>(.{1,2})<\/span>/
PROPOSED_UNIFIED_CHAR = /<span class='proposed_uni'>U\+([0-9a-fA-F]{3,5})<\/span>/

UNICODE_CHAR = /U\+([0-9a-fA-F]{3,5})/

emojis = {}

request full_table, (error, response, body) ->
    if (response.statusCode is 404) or error
        console.error error or "The original page doesn't exist anymore"

    rows = body.match TR_REGEXP
    return console.error "no emojis, might have encoutered some issues..." unless rows

    console.log '' + rows.length, "emojis to be extracted"

    if rows
        processRow(row, index) for row, index in rows
        console.log Object.keys(emojis).length

processRow = (row, index) ->
    cells = row.split /<td ?.*?>(.*?)<\/td>/
    cells = cells.filter (cell, index) ->
        return false if index is 0
        return false if index is cells.length - 1
        return false if cell is "" or cell is ''
        true

    id = (UNICODE_ID.exec cells[0])[1]
    unicode = ((UNICODE_CHAR.exec cells[1])[1]).toLowerCase()

    char = (UNIFIED_CHAR.exec cells[1])?[1] or String.fromCharCode(parseInt(unicode, 16))

    name = cells[2].split("<br>")[0]

    docomo = ((UNICODE_CHAR.exec cells[3])?[1])?.toLowerCase() or false
    kddi = ((UNICODE_CHAR.exec cells[4])?[1])?.toLowerCase() or false
    softbank = ((UNICODE_CHAR.exec cells[5])?[1])?.toLowerCase() or false
    google = ((UNICODE_CHAR.exec cells[6])?[1])?.toLowerCase() or false

    console.log id, char, "\t", unicode, "\t", docomo, "\t", kddi, "\t", softbank, "\t", google, "\t", name

    e = emojis[id] = {}
    e.id = id
    e.unified = char if char
    e.unicode = unicode
    e.name = name

    e.docomo = docomo
    e.kddi = kddi
    e.softbank = softbank
    e.google = google


