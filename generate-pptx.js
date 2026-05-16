const PptxGenJS = require('pptxgenjs');

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sermonTitle, seriesName, mainScripture, pastorName, sermonDate, slides } = req.body;

    if (!sermonTitle || !slides || slides.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';

    // Colors
    const NAVY = '0e2a5c';
    const ROYAL = '1a4494';
    const GOLD = 'c9a84c';
    const WHITE = 'FFFFFF';
    const LGRAY = 'aabbcc';

    function bg(sl) {
      sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: NAVY } });
    }

    function topBar(sl) {
      sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.07, fill: { color: GOLD } });
    }

    function botBar(sl) {
      sl.addShape(pptx.ShapeType.rect, { x: 0, y: 5.55, w: '100%', h: 0.07, fill: { color: GOLD } });
    }

    // ── TITLE SLIDE ──
    const ts = pptx.addSlide();
    bg(ts);
    topBar(ts);
    botBar(ts);

    ts.addText('UCC PASAY CHURCH', {
      x: 0.5,
      y: 0.3,
      w: 9,
      h: 0.4,
      fontSize: 10,
      bold: true,
      color: GOLD,
      align: 'center',
      charSpacing: 5,
      fontFace: 'Calibri'
    });

    if (seriesName) {
      ts.addText(seriesName, {
        x: 0.5,
        y: 0.72,
        w: 9,
        h: 0.35,
        fontSize: 11,
        color: LGRAY,
        align: 'center',
        italic: true,
        fontFace: 'Georgia'
      });
    }

    ts.addShape(pptx.ShapeType.rect, {
      x: 3.5,
      y: seriesName ? 1.15 : 1.05,
      w: 3,
      h: 0.035,
      fill: { color: GOLD }
    });

    ts.addText(sermonTitle, {
      x: 0.5,
      y: seriesName ? 1.2 : 1.1,
      w: 9,
      h: 1.8,
      fontSize: 42,
      bold: true,
      color: WHITE,
      align: 'center',
      fontFace: 'Georgia',
      valign: 'middle'
    });

    if (mainScripture) {
      ts.addText(mainScripture, {
        x: 0.5,
        y: 3.0,
        w: 9,
        h: 0.45,
        fontSize: 14,
        color: GOLD,
        align: 'center',
        italic: true,
        fontFace: 'Georgia'
      });
    }

    ts.addShape(pptx.ShapeType.rect, {
      x: 3.5,
      y: mainScripture ? 3.55 : 3.05,
      w: 3,
      h: 0.035,
      fill: { color: GOLD }
    });

    const dateStr = sermonDate
      ? new Date(sermonDate + 'T00:00:00').toLocaleDateString('en-PH', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '';
    const meta = [pastorName, dateStr].filter(Boolean).join('   •   ');
    if (meta) {
      ts.addText(meta, {
        x: 0.5,
        y: mainScripture ? 3.7 : 3.2,
        w: 9,
        h: 0.38,
        fontSize: 11,
        color: LGRAY,
        align: 'center',
        fontFace: 'Calibri'
      });
    }

    // ── CONTENT SLIDES ──
    slides.forEach((s) => {
      if (s.type === 'scripture') {
        const hasTl = s.tl && s.tl.trim();
        const sl = pptx.addSlide();
        bg(sl);
        topBar(sl);
        botBar(sl);

        sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0.07, w: 0.08, h: '100%', fill: { color: GOLD } });

        sl.addText('SCRIPTURE', {
          x: 0.28,
          y: 0.18,
          w: 9.5,
          h: 0.3,
          fontSize: 8,
          bold: true,
          color: GOLD,
          charSpacing: 4,
          fontFace: 'Calibri'
        });

        sl.addText(s.ref, {
          x: 0.28,
          y: 0.45,
          w: 7,
          h: 0.55,
          fontSize: 26,
          bold: true,
          color: WHITE,
          fontFace: 'Georgia'
        });

        sl.addText(s.ver || 'NKJV', {
          x: 7.3,
          y: 0.45,
          w: 2.5,
          h: 0.55,
          fontSize: 11,
          color: GOLD,
          align: 'right',
          bold: true,
          charSpacing: 2,
          fontFace: 'Calibri',
          valign: 'bottom'
        });

        if (hasTl) {
          sl.addText(`"${s.verse}"`, {
            x: 0.28,
            y: 1.1,
            w: 9.4,
            h: 1.95,
            fontSize: 16,
            color: WHITE,
            italic: true,
            fontFace: 'Georgia',
            valign: 'top',
            wrap: true,
            lineSpacingMultiple: 1.45
          });

          sl.addShape(pptx.ShapeType.rect, { x: 0.28, y: 3.15, w: 9.2, h: 0.025, fill: { color: '2a4a80' } });

          sl.addText('Tagalog', {
            x: 0.28,
            y: 3.23,
            w: 2,
            h: 0.25,
            fontSize: 8,
            color: GOLD,
            bold: true,
            charSpacing: 2,
            fontFace: 'Calibri'
          });

          sl.addText(`"${s.tl}"`, {
            x: 0.28,
            y: 3.45,
            w: 9.4,
            h: 1.85,
            fontSize: 13,
            color: LGRAY,
            italic: true,
            fontFace: 'Georgia',
            valign: 'top',
            wrap: true,
            lineSpacingMultiple: 1.4
          });
        } else {
          sl.addText(`"${s.verse}"`, {
            x: 0.28,
            y: 1.1,
            w: 9.4,
            h: 4.1,
            fontSize: 20,
            color: WHITE,
            italic: true,
            fontFace: 'Georgia',
            valign: 'top',
            wrap: true,
            lineSpacingMultiple: 1.5
          });
        }
      } else if (s.type === 'points') {
        const sl = pptx.addSlide();
        bg(sl);
        botBar(sl);

        sl.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 1.2, fill: { color: ROYAL } });
        sl.addShape(pptx.ShapeType.rect, { x: 0, y: 1.2, w: '100%', h: 0.06, fill: { color: GOLD } });

        sl.addText(s.title, {
          x: 0.45,
          y: 0.1,
          w: 9.1,
          h: 1.0,
          fontSize: 28,
          bold: true,
          color: WHITE,
          fontFace: 'Georgia',
          valign: 'middle'
        });

        const ptObjs = [];
        (s.pts || []).forEach((p, i) => {
          if (i > 0) ptObjs.push({ text: '\n', options: { fontSize: 8 } });
          ptObjs.push({ text: `${i + 1}.  `, options: { color: GOLD, bold: true, fontSize: 20, fontFace: 'Georgia' } });
          ptObjs.push({ text: p, options: { color: WHITE, fontSize: 18, fontFace: 'Calibri', breakLine: false } });
        });

        sl.addText(ptObjs, {
          x: 0.45,
          y: 1.35,
          w: 9.1,
          h: 3.95,
          valign: 'top',
          wrap: true,
          lineSpacingMultiple: 1.7
        });
      } else if (s.type === 'section') {
        const sl = pptx.addSlide();
        bg(sl);
        topBar(sl);
        botBar(sl);

        sl.addShape(pptx.ShapeType.rect, { x: 1.5, y: 2.15, w: 7, h: 0.045, fill: { color: GOLD } });

        sl.addText(s.title, {
          x: 0.5,
          y: 2.25,
          w: 9,
          h: 1.0,
          fontSize: 38,
          bold: true,
          color: WHITE,
          align: 'center',
          fontFace: 'Georgia'
        });

        if (s.sub) {
          sl.addText(s.sub, {
            x: 0.5,
            y: 3.3,
            w: 9,
            h: 0.45,
            fontSize: 14,
            color: GOLD,
            align: 'center',
            italic: true,
            fontFace: 'Georgia'
          });
        }

        sl.addShape(pptx.ShapeType.rect, {
          x: 1.5,
          y: s.sub ? 3.85 : 3.35,
          w: 7,
          h: 0.045,
          fill: { color: GOLD }
        });
      } else if (s.type === 'quote') {
        const sl = pptx.addSlide();
        bg(sl);
        topBar(sl);
        botBar(sl);

        sl.addText('"', {
          x: 0.1,
          y: 0.2,
          w: 1.5,
          h: 1.2,
          fontSize: 90,
          color: GOLD,
          fontFace: 'Georgia',
          valign: 'top'
        });

        sl.addText(s.quote, {
          x: 0.45,
          y: 1.0,
          w: 9.1,
          h: 3.2,
          fontSize: 23,
          color: WHITE,
          italic: true,
          fontFace: 'Georgia',
          align: 'center',
          valign: 'middle',
          wrap: true,
          lineSpacingMultiple: 1.5
        });

        if (s.attr) {
          sl.addShape(pptx.ShapeType.rect, { x: 3.75, y: 4.35, w: 2.5, h: 0.035, fill: { color: GOLD } });
          sl.addText(`— ${s.attr}`, {
            x: 0.5,
            y: 4.48,
            w: 9,
            h: 0.38,
            fontSize: 13,
            color: GOLD,
            align: 'center',
            bold: true,
            fontFace: 'Calibri'
          });
        }
      } else if (s.type === 'blank') {
        const sl = pptx.addSlide();
        bg(sl);
        topBar(sl);
        botBar(sl);
      }
    });

    // ── CLOSING SLIDE ──
    const cs = pptx.addSlide();
    bg(cs);
    topBar(cs);
    botBar(cs);

    cs.addShape(pptx.ShapeType.rect, { x: 3.25, y: 1.95, w: 3.5, h: 0.045, fill: { color: GOLD } });

    cs.addText('God Bless You', {
      x: 0.5,
      y: 2.05,
      w: 9,
      h: 1.0,
      fontSize: 42,
      bold: true,
      color: WHITE,
      align: 'center',
      fontFace: 'Georgia'
    });

    cs.addText('UCC PASAY CHURCH', {
      x: 0.5,
      y: 3.12,
      w: 9,
      h: 0.4,
      fontSize: 10,
      color: GOLD,
      align: 'center',
      charSpacing: 5,
      bold: true,
      fontFace: 'Calibri'
    });

    cs.addShape(pptx.ShapeType.rect, { x: 3.25, y: 3.6, w: 3.5, h: 0.045, fill: { color: GOLD } });

    if (pastorName) {
      cs.addText(pastorName, {
        x: 0.5,
        y: 3.8,
        w: 9,
        h: 0.38,
        fontSize: 11,
        color: LGRAY,
        align: 'center',
        fontFace: 'Calibri'
      });
    }

    // Generate buffer
    const buffer = await pptx.write({ outputType: 'arraybuffer' });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
    res.setHeader('Content-Disposition', `attachment; filename="${sermonTitle.replace(/[^a-z0-9 ]/gi, '').trim() || 'Sermon'}.pptx"`);

    // Send buffer
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('PPTX generation error:', error);
    res.status(500).json({ error: 'Failed to generate PPTX', details: error.message });
  }
}
