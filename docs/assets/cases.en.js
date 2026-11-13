"use strict";

const englishCaseCopy = {
  "pie": [
    "Pie chart",
    "The numbers appear, but belong to different categories",
    "OpenThai Markdown lists the categories in legend order, then assigns percentages to the wrong categories in the output table.",
    [
      "Category",
      "Source image",
      "OpenThai Markdown"
    ],
    [
      "Typhoon locates the chart. The standard prompt leaves the figure text field empty.",
      "The category names and percentages appear separately in the text, following their positions on the page.",
      "Returns the chart type and legend, but assigns values to the wrong categories in the table."
    ]
  ],
  "funnel": [
    "National CERT chart",
    "All seven categories match their values",
    "OpenThai Markdown preserves the top-to-bottom order, but misses the printed total of 135.",
    [
      "Category",
      "Source image",
      "OpenThai Markdown"
    ],
    [
      "Typhoon locates the chart. The standard prompt leaves the figure text field empty.",
      "Gets five of eight checked values right, including the total of 135.",
      "Converts the chart to a table in the original order and preserves every category value."
    ]
  ],
  "monthly": [
    "Monthly table",
    "A correct number needs to be in the right month",
    "Typhoon and Markdown matched all 130 checked values, including totals. Text matched 75 using line coordinates.",
    [
      "Row / Month",
      "Source image",
      "Answer using OpenThai Text output"
    ],
    [
      "Gets 130 of 130 cells right and returns HTML with rows and columns.",
      "Some months are missing from the flat text. In this example, Qwen therefore assigned 64 to March.",
      "Gets 130 of 130 cells right and preserves rows and columns in HTML."
    ]
  ],
  "controls": [
    "Control matrix",
    "The dots show which levels a control applies to",
    "Across the two pages, Typhoon and Markdown preserved the dots in all 18 rows. Text read the control names but missed the dots.",
    [
      "Control",
      "Levels in the source",
      "Levels in Typhoon and Markdown"
    ],
    [
      "Preserves both the dots and empty cells.",
      "Reads the row labels but misses the dots that mark each level.",
      "Returns which levels apply in the HTML table."
    ]
  ],
  "controls-continued": [
    "Control matrix (cont.)",
    "Exercises and recovery apply at different levels",
    "The exercise row has a dot at all three levels. Recovery has a dot only at the high level. The table gives no exercise frequency.",
    [
      "Control",
      "Levels in the source",
      "Levels in Typhoon and Markdown"
    ],
    [
      "Distinguishes the two empty cells from the dot in the high-level column.",
      "Reads the row labels but misses the dots.",
      "Keeps every dot in the correct column."
    ]
  ]
};

const englishTableText = {
  "รวม": "Total",
  "ไม่ปรากฏ": "Missing",
  "Vulnerability / มี.ค.": "Vulnerability / Mar",
  "Intrusion Attemps / ธ.ค.": "Intrusion Attempts / Dec",
  "Intrusions / ธ.ค.": "Intrusions / Dec",
  "ต่ำ / กลาง / สูง": "Low / Medium / High",
  "กลาง / สูง": "Medium / High",
  "สูง": "High"
};

const englishReferences = {
  "annual-049": "NCSA annual report, 2021 · PDF p. 49 / printed p. 47",
  "annual-051": "NCSA annual report, 2021 · PDF p. 51 / printed p. 49",
  "minimum-004": "2023 minimum cybersecurity standards · PDF p. 4",
  "minimum-005": "2023 minimum cybersecurity standards · PDF p. 5"
};

function englishCase(item) {
  const [tab, title, description, headers, notes] = englishCaseCopy[item.id];
  return {
    ...item, tab, title, description, headers,
    reference: englishReferences[item.page],
    rows: item.rows.map(([label, original, result, status]) => [
      englishTableText[label] ?? label,
      englishTableText[original] ?? original,
      englishTableText[result] ?? result,
      status
    ]),
    notes: item.notes.map(([, excerpt], index) => [notes[index], excerpt])
  };
}
