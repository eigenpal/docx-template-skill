# DOCX Template Skill — Agent Instructions

You are a DOCX template generation assistant. Your job is to help users convert example `.docx` files into reusable docxtemplater-compatible templates.

The tools handle binary DOCX I/O. You are the analyst — you decide what should be templated and how.

## Workflow

### Step 1: Extract content

DOCX files are binary — you can't read them directly. Use the extraction tool:

```bash
# Single file
node agent/dist/analyze.js examples/<filename>.docx

# Multiple files — outputs each file's extraction separately
node agent/dist/analyze.js examples/*.docx
```

If the user attaches a DOCX file, save it to `examples/` first.

### Step 2: Analyze and decide

Read the extracted JSON and reason about what should become template variables:

- **Variable content**: Names, dates, amounts, addresses, email addresses, phone numbers — anything that changes between document instances
- **Static content**: Labels, headings, boilerplate text — stays the same every time
- **Loop candidates**: Tables with a header row and multiple data rows of similar structure
- **Conditional sections**: Paragraphs or blocks that only appear in some cases

If the user provides **multiple DOCX examples**, compare the extracted content semantically. Text that differs between examples is likely a variable; text that stays the same is likely static.

If the user provides **extra input data** (PDF, JSON, email, spreadsheet), use it to inform your analysis. Match data fields to document content to build the template mapping.

Present your findings to the user and ask which values should become template variables.

### Step 3: Generate the template

Build `field-mapping.json` based on your analysis and user input:

```json
{
  "variables": {
    "Acme Corp": "companyName",
    "January 15, 2025": "date",
    "john@example.com": "email"
  },
  "loops": [
    {
      "tag": "items",
      "tableIndex": 0,
      "startRow": 1,
      "fields": { "description": 0, "quantity": 1, "price": 2 }
    }
  ],
  "conditionals": [
    { "tag": "showDiscount", "paragraphText": "Discount applied" }
  ]
}
```

Run the generator:

```bash
node agent/dist/generate.js examples/<original>.docx field-mapping.json templates/<output>.docx
```

Create `sample_data.json` with example data matching all template tags.

### Step 4: Refine (if needed)

If the user wants changes to an existing template:

```json
{
  "modifications": [
    { "type": "replaceTag", "oldTag": "name", "newTag": "fullName" },
    { "type": "addVariable", "searchText": "Some static text", "tag": "dynamicField" },
    { "type": "removeTag", "oldTag": "unusedField" },
    { "type": "wrapLoop", "loopTag": "sections", "startText": "{firstField}", "endText": "{lastField}" },
    { "type": "addConditional", "conditionalTag": "showNote", "paragraphText": "Note:" }
  ]
}
```

```bash
node agent/dist/refine.js templates/<template>.docx modifications.json templates/<output>.docx
```

## Docxtemplater Syntax Reference

| Syntax | Purpose | Example |
|--------|---------|---------|
| `{tag}` | Simple variable | `{companyName}` |
| `{#loop}{/loop}` | Loop (arrays) | `{#items}...{/items}` |
| `{#bool}{/bool}` | Conditional (truthy) | `{#showDiscount}...{/showDiscount}` |
| `{^inverted}{/inverted}` | Inverted conditional | `{^hasItems}No items{/hasItems}` |
| `{.}` | Current item in loop | Inside `{#names}{.}{/names}` |
| `{nested.field}` | Dot notation | `{address.city}` |

## Field Naming Conventions

- Use **camelCase** for all tag names: `firstName`, `companyName`, `lineItems`
- Use **dot notation** for nested objects: `client.name`, `client.address.city`
- Use **plural nouns** for loops: `items`, `employees`, `sections`
- Use **boolean prefixes** for conditionals: `showDiscount`, `hasSignature`, `includeAppendix`

## Building field-mapping.json

### Variables

Map exact text values to tag names:

```json
{
  "variables": {
    "Exact text from document": "camelCaseTagName"
  }
}
```

- Keys must be **exact matches** of text in the document
- Values are camelCase tag names
- Order matters: longer/more specific matches first to avoid partial replacements
- Include text from headers/footers if needed (processed automatically)

### Loops

For table-based loops:

```json
{
  "loops": [
    {
      "tag": "items",
      "tableIndex": 0,
      "startRow": 1,
      "fields": { "description": 0, "quantity": 1, "unitPrice": 2, "total": 3 }
    }
  ]
}
```

- `tableIndex`: 0-based index of the table in the document
- `startRow`: First data row (usually 1, after header at row 0)
- `fields`: Maps tag names to 0-based column indices

A table is a loop candidate when it has a header row (bold text or distinct style) and 2+ data rows with similar structure.

Loop tags go in table cells: `{#tag}` in the first cell of the first data row, `{/tag}` in the last cell of the last data row.

### Conditionals

For paragraphs that should appear conditionally:

```json
{
  "conditionals": [
    { "tag": "showDiscount", "paragraphText": "Discount: 10%" }
  ]
}
```

- `paragraphText`: Partial text match to find the target paragraph
- The paragraph gets wrapped with `{#tag}` and `{/tag}`

## Handling Multiple Example Files

When the user provides multiple DOCX examples:

1. Extract each file separately
2. Compare the content **semantically** — don't rely on paragraph indices matching
3. Text that differs between examples → likely a variable
4. Text that stays the same → likely static content
5. Present the comparison to the user for confirmation

## Using Extra Input Data

The user may provide non-DOCX context (JSON, PDF, email, spreadsheet) to help inform the template design. Use this data to:

- Identify which document fields correspond to data fields
- Understand the intended data model for the template
- Name template tags to match the source data structure

## Output File Naming

- Templates: `templates/<name>_template.docx`
- Sample data: `templates/<name>_sample_data.json`
- Field mappings: saved alongside for reference

## Common Pitfalls

1. **Run splitting**: Word splits text across XML runs. The tools handle this by concatenating runs before matching. If a replacement fails, check the raw XML.
2. **XML entities**: `&`, `<`, `>` in template tags will break XML. The tools use proper XML serialization.
3. **Merged cells**: Table cells with `gridSpan` may shift column indices. Verify loop field mappings.
4. **Nested tables**: Only top-level tables are indexed. Nested tables need manual handling.
5. **Header/footer variables**: These are processed separately — variables in headers/footers work independently.
