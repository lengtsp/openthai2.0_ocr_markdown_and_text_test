const testSequence = [
  [
    "NCSA preface · single-column text",
    "On the NCSA manual’s preface (“คำนำ”), Typhoon matched the reference exactly (CER 0.00%, BLEU 100.00). OpenThai Markdown made minor errors, such as “Artificial” becoming “Artifificial” (CER 0.13%, BLEU 99.87). OpenThai Text read “AI” as “Al” and misread “คำนำ” (CER 0.52%, BLEU 99.08). Text took 0.37 seconds, compared with 3.03 seconds for Typhoon and 10.28 seconds for Markdown. For making manuals or policies searchable, this is the kind of page OpenThai Text handles well.",
    "คำนำคู่มือ สกมช. · ข้อความคอลัมน์เดียว",
    "Typhoon อ่านตรงกับข้อความอ้างอิง (CER 0.00%, BLEU 100.00) ส่วน OpenThai Markdown สะกด “Artificial” เป็น “Artifificial” (CER 0.13%, BLEU 99.87) และ OpenThai Text อ่าน “AI” เป็น “Al” พร้อมอ่านคำว่า “คำนำ” ผิด (CER 0.52%, BLEU 99.08) แต่ใช้เวลาเพียง 0.37 วินาที เทียบกับ Typhoon 3.03 วินาที และ Markdown 10.28 วินาที Text เหมาะกับหน้าลักษณะนี้เมื่อต้องการทำคู่มือหรือนโยบายให้ค้นได้"
  ],
  [
    "Bank of Thailand economic table · values in the right rows",
    "OpenThai Markdown had the best full-page text score and placed the numbers correctly in the two rows checked. OpenThai Text read the rows in order but dropped or misread some decimal points. Typhoon produced an HTML table with a custom prompt, but shifted a set of values onto the wrong line items.",
    "ตารางเศรษฐกิจ ธปท. · ตัวเลขกับแถว",
    "OpenThai Markdown ได้คะแนนข้อความทั้งหน้าดีที่สุดและวางตัวเลขถูกตำแหน่งในสองแถวที่ตรวจ OpenThai Text อ่านตามลำดับแถว แต่ทำจุดทศนิยมบางตำแหน่งหายหรืออ่านผิด ส่วน Typhoon ใช้ Prompt ที่กำหนดเองแล้วได้ตาราง HTML แต่เลื่อนค่าทั้งชุดไปอยู่ผิดรายการ"
  ],
  [
    "NCSA Do’s and Don’ts · two independent lists",
    "OpenThai Markdown returned all nine Do’s and nine Don’ts in order, with each list intact. Typhoon kept items on the correct side in HTML row pairs. To read one list at a time, extract the entire left column first and then the right. OpenThai Text mixed the columns, putting “ความถูกต้อง” from the Don’ts at the end of a line on the Do’s side. Markdown separated the lists most clearly in its direct output.",
    "Do’s และ Don’ts ของ สกมช. · สองรายการแยกฝั่ง",
    "OpenThai Markdown เก็บครบ 9 ข้อต่อฝั่งตามลำดับ Typhoon เก็บแต่ละข้อไว้ถูกฝั่งในรูปแบบ HTML ที่จับคู่รายแถว หากต้องการอ่านทีละฝั่ง ให้ดึงคอลัมน์ซ้ายทั้งหมดก่อนแล้วค่อยดึงคอลัมน์ขวา ส่วน OpenThai Text ดึงคำว่า “ความถูกต้อง” จากฝั่ง Don’ts ไปต่อท้ายบรรทัดของฝั่ง Do’s ผลที่ได้โดยตรงจาก Markdown แยกสองรายการได้ชัดที่สุด"
  ],
  [
    "Bank of Thailand slide · reading six numbered boxes",
    "The slide is numbered 1 → 2 → 3 → 4 → 5 → 6. Typhoon and OpenThai Markdown read down the columns in the order 1 → 4 → 2 → 5 → 3 → 6. Typhoon preserved much of the wording (CER 48.01%, BLEU 97.77). Markdown repeated “ความถี่: รายเดือน” (CER 47.28%, BLEU 94.43). Text merged content across boxes and misread more characters (CER 67.13%, BLEU 86.54). BLEU stayed high because many passages still matched despite the changed reading order.",
    "สไลด์ ธปท. · ลำดับกล่องทั้งหก",
    "ต้นฉบับเรียง 1 → 2 → 3 → 4 → 5 → 6 แต่ Typhoon และ OpenThai Markdown อ่านลงคอลัมน์เป็น 1 → 4 → 2 → 5 → 3 → 6 Typhoon เก็บถ้อยคำได้ใกล้ต้นฉบับหลายช่วง (CER 48.01%, BLEU 97.77) ส่วน Markdown อ่าน “ความถี่: รายเดือน” ซ้ำ (CER 47.28%, BLEU 94.43) และ Text รวมข้อความข้ามกล่องพร้อมอ่านผิดเพิ่ม (CER 67.13%, BLEU 86.54) BLEU ยังสูงได้เมื่อข้อความแต่ละช่วงตรงกันแม้ลำดับทั้งหน้าจะเปลี่ยน"
  ],
  [
    "Bank of Thailand charts · match years to printed values",
    "OpenThai Markdown and Typhoon with a chart-specific prompt tied at 26/26 year–value pairs. OpenThai Text read many values without clearly linking them to years. Standard Typhoon located the chart but left the chart text empty. On the stacked chart without printed values, Markdown and targeted Typhoon returned different numbers. Cite the source data for those figures.",
    "กราฟ ธปท. · จับคู่ปีกับค่าที่พิมพ์ไว้",
    "OpenThai Markdown และ Typhoon แบบถามเฉพาะกราฟจับคู่ปีและค่าได้ครบ 26/26 จุด OpenThai Text อ่านได้หลายค่าแต่จับคู่กับปีได้ยาก ส่วน Typhoon มาตรฐานเจอกราฟแต่เว้นข้อความในกราฟไว้ สำหรับกราฟแท่งซ้อนที่ไม่พิมพ์ค่าไว้ Markdown กับ Typhoon แบบเจาะจงคืนตัวเลขต่างกัน จึงควรอ้างจากข้อมูลต้นทาง"
  ],
  [
    "NCSA dashboard · targeted Typhoon kept the right order",
    "When asked for the dashboard numbers, Typhoon returned all six values in the same order as the image. OpenThai Text also read all six but swapped the first two. OpenThai Markdown and standard Typhoon read surrounding text but missed all six dashboard numbers. Targeted Typhoon performed best when the order mattered.",
    "ภาพหน้าจอ สกมช. · Typhoon แบบเจาะจงเรียงตัวเลขได้ดีที่สุด",
    "Typhoon แบบถามเฉพาะเลขบนจอคืนครบทั้ง 6 ค่าและเรียงตรงภาพ OpenThai Text อ่านครบเช่นกันแต่สลับสองตัวแรก ส่วน OpenThai Markdown และ Typhoon มาตรฐานอ่านคำบรรยายรอบภาพได้แต่พลาดตัวเลขทั้งหกค่าบนจอ"
  ],
  [
    "ETDA flowcharts · read the steps and check the arrows",
    "OpenThai Text read nearly all checked box labels. OpenThai Markdown converted the diagram into a table and dropped several boxes on the withdrawal page. Standard Typhoon detected the diagram as a figure and left its text empty. Targeted Typhoon read all checked labels and followed 6 of 12 arrows correctly. It still sent the complete-information branch to “ปฏิเสธรายการ” (reject the transaction) instead of “ลงลายมือชื่อ” (sign). Before using a flowchart as audit evidence, I would check every arrow and condition against the original.",
    "ผังงาน ETDA · อ่านชื่อขั้นตอนและตรวจลูกศร",
    "OpenThai Text อ่านชื่อกล่องที่ตรวจได้เกือบครบ OpenThai Markdown แปลงผังเป็นตารางและตกหล่นหลายกล่องในหน้าถอนเงิน ส่วน Typhoon มาตรฐานจัดผังเป็นภาพและเว้นข้อความในผังไว้ Typhoon แบบเจาะจงอ่านชื่อกล่องที่ตรวจครบและตามลูกศรถูก 6/12 เส้น แต่พาเงื่อนไขข้อมูลครบไปปฏิเสธรายการ ทั้งที่ต้นฉบับให้ลงลายมือชื่อ ก่อนใช้เป็นหลักฐาน Audit ควรตรวจลูกศรและเงื่อนไขกับต้นฉบับทุกจุด"
  ]
];
