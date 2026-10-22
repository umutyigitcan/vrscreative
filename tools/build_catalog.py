from pathlib import Path

from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "dist" / "assets"
OUTPUT = ROOT / "output" / "pdf" / "vrs-creative-ornek-katalog.pdf"

W, H = A4
INK = HexColor("#26282b")
ACCENT = HexColor("#278dac")
CYAN = HexColor("#0aade8")
MIST = HexColor("#f2f3f4")
GREY = HexColor("#73777c")


def register_fonts():
    regular = Path("/System/Library/Fonts/Supplemental/Arial.ttf")
    bold = Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("VRSRegular", str(regular)))
        pdfmetrics.registerFont(TTFont("VRSBold", str(bold)))
        return "VRSRegular", "VRSBold"
    return "Helvetica", "Helvetica-Bold"


FONT, BOLD = register_fonts()


def crop_image(c, path, x, y, width, height, anchor="center"):
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    source_ratio = iw / ih
    target_ratio = width / height
    if source_ratio > target_ratio:
        draw_h = height
        draw_w = height * source_ratio
        draw_x = x - (draw_w - width) / 2
        draw_y = y
    else:
        draw_w = width
        draw_h = width / source_ratio
        draw_x = x
        if anchor == "top":
            draw_y = y + height - draw_h
        else:
            draw_y = y - (draw_h - height) / 2
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(image, draw_x, draw_y, draw_w, draw_h, mask="auto")
    c.restoreState()


def label(c, text, x, y, color=ACCENT):
    c.setFillColor(color)
    c.setFont(BOLD, 8)
    c.drawString(x, y, text.upper())


def paragraph(c, text, x, y, width, size=10, leading=16, color=GREY, max_lines=None):
    c.setFont(FONT, size)
    c.setFillColor(color)
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if c.stringWidth(candidate, FONT, size) <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    if max_lines:
        lines = lines[:max_lines]
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def footer(c, page):
    c.setStrokeColor(Color(0.15, 0.16, 0.17, alpha=0.18))
    c.line(38, 28, W - 38, 28)
    c.setFont(FONT, 6.5)
    c.setFillColor(GREY)
    c.drawString(38, 16, "VRS CREATIVE / ÖRNEK KATALOG - GERÇEK BELGE DEĞİLDİR")
    c.drawRightString(W - 38, 16, f"{page:02d}")


def cover(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    crop_image(c, ASSETS / "kutu-harf.jpg", 0, 0, W, H)
    c.setFillColor(Color(0.08, 0.09, 0.1, alpha=0.78))
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(Color(0.15, 0.55, 0.67, alpha=0.32))
    c.rect(W * 0.66, 0, W * 0.34, H, fill=1, stroke=0)
    c.setFillColor(Color(1, 1, 1, alpha=0.92))
    c.roundRect(44, H - 103, 176, 52, 3, fill=1, stroke=0)
    c.drawImage(str(ASSETS / "vrs-logo.png"), 54, H - 94, 156, 34, mask="auto", preserveAspectRatio=True)
    c.setFillColor(white)
    c.setFont(BOLD, 10)
    c.drawString(48, H - 184, "TABELA / BASKI / UYGULAMA")
    c.setFont(BOLD, 39)
    c.drawString(46, H - 250, "PROJE")
    c.drawString(46, H - 294, "KATALOĞU")
    c.setFillColor(CYAN)
    c.rect(48, H - 319, 84, 5, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont(FONT, 12)
    c.drawString(48, 94, "2026 / ÖRNEK SUNUM")
    c.setFont(FONT, 8)
    c.setFillColor(Color(1, 1, 1, alpha=0.62))
    c.drawString(48, 72, "Bu katalog prototip amaçlı hazırlanmıştır; gerçek referans veya taahhüt içermez.")
    c.showPage()


def page_two(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    crop_image(c, ASSETS / "lightbox.jpg", 0, H * 0.51, W, H * 0.49)
    c.setFillColor(ACCENT)
    c.rect(0, H * 0.48, W, H * 0.03, fill=1, stroke=0)
    label(c, "01 / VRS Creative", 42, H * 0.42)
    c.setFillColor(INK)
    c.setFont(BOLD, 29)
    c.drawString(42, H * 0.36, "Markanızın görünen yüzü.")
    paragraph(
        c,
        "VRS Creative; tabela, dijital baskı, cephe ve araç giydirme çözümlerini tasarımdan montaja kadar tek akışta planlayan bir uygulama markasıdır.",
        42,
        H * 0.30,
        W - 84,
        11,
        18,
    )
    cards = [
        ("01", "Keşif ve ölçü", "Uygulama alanı ve görünürlük koşulları değerlendirilir."),
        ("02", "Tasarım ve üretim", "Malzeme, renk, aydınlatma ve teknik detaylar netleştirilir."),
        ("03", "Montaj ve teslim", "Planlı saha uygulamasıyla proje çalışır durumda teslim edilir."),
    ]
    card_w = (W - 100) / 3
    for i, (num, title, copy) in enumerate(cards):
        x = 42 + i * (card_w + 8)
        c.setFillColor(MIST)
        c.roundRect(x, 72, card_w, 115, 3, fill=1, stroke=0)
        c.setFillColor(ACCENT)
        c.setFont(BOLD, 15)
        c.drawString(x + 14, 160, num)
        c.setFillColor(INK)
        c.setFont(BOLD, 10)
        c.drawString(x + 14, 136, title)
        paragraph(c, copy, x + 14, 116, card_w - 28, 7.5, 11, GREY)
    footer(c, 2)
    c.showPage()


def page_three(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    label(c, "02 / Hizmetler", 42, H - 56, CYAN)
    c.setFillColor(white)
    c.setFont(BOLD, 30)
    c.drawString(42, H - 104, "Her yüzey yeni bir imkân.")
    items = [
        ("Kutu Harf", "kutu-harf.jpg"),
        ("Cephe Giydirme", "cephe-giydirme.jpg"),
        ("Totem Tabela", "totem-tabela.jpg"),
        ("Dijital Baskı", "dijital-baski.jpg"),
    ]
    gap = 10
    card_w = (W - 84 - gap) / 2
    card_h = 270
    for idx, (title, image) in enumerate(items):
        col = idx % 2
        row = idx // 2
        x = 42 + col * (card_w + gap)
        y = H - 142 - (row + 1) * card_h - row * gap
        crop_image(c, ASSETS / image, x, y, card_w, card_h)
        c.setFillColor(Color(0, 0, 0, alpha=0.48))
        c.rect(x, y, card_w, 58, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont(BOLD, 12)
        c.drawString(x + 15, y + 33, title)
        c.setFont(FONT, 7)
        c.setFillColor(Color(1, 1, 1, alpha=0.72))
        c.drawString(x + 15, y + 18, "Tasarım / üretim / uygulama")
    c.setFont(FONT, 6.5)
    c.setFillColor(Color(1, 1, 1, alpha=0.55))
    c.drawString(42, 16, "VRS CREATIVE / ÖRNEK KATALOG - GERÇEK REFERANS LİSTESİ DEĞİLDİR")
    c.drawRightString(W - 38, 16, "03")
    c.showPage()


def page_four(c):
    c.setFillColor(white)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    label(c, "03 / Tabela Sistemleri", 42, H - 54)
    c.setFillColor(INK)
    c.setFont(BOLD, 31)
    c.drawString(42, H - 104, "Gündüz net. Gece güçlü.")
    crop_image(c, ASSETS / "totem-tabela.jpg", 42, H - 520, 235, 360)
    crop_image(c, ASSETS / "kutu-harf.jpg", 291, H - 375, W - 333, 215)
    c.setFillColor(MIST)
    c.rect(291, H - 520, W - 333, 132, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont(BOLD, 15)
    c.drawString(309, H - 420, "Tabela çözümleri")
    paragraph(c, "Kutu harf, lightbox, totem, yönlendirme ve cephe tabelaları; mekân, mesafe ve marka diline göre projelendirilir.", 309, H - 446, W - 369, 8.5, 13)
    rows = ["Kutu harf ve ışıklı tabela", "Totem ve yönlendirme", "Lightbox ve germe vinil", "Neon LED ve iç mekân uygulamaları"]
    y = H - 574
    for row in rows:
        c.setStrokeColor(HexColor("#d8dbde"))
        c.line(42, y - 8, W - 42, y - 8)
        c.setFillColor(ACCENT)
        c.circle(48, y + 8, 2.2, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont(BOLD, 10)
        c.drawString(62, y + 4, row)
        c.setFillColor(GREY)
        c.setFont(FONT, 8)
        c.drawRightString(W - 42, y + 4, "PROJEYE ÖZEL")
        y -= 42
    footer(c, 4)
    c.showPage()


def page_five(c):
    c.setFillColor(MIST)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    label(c, "04 / Baskı ve Giydirme", 42, H - 54)
    c.setFillColor(INK)
    c.setFont(BOLD, 29)
    c.drawString(42, H - 102, "Markanız sahada hareket etsin.")
    crop_image(c, ASSETS / "arac-giydirme.jpg", 42, H - 465, W - 84, 315)
    c.setFillColor(white)
    c.rect(42, 92, W - 84, 252, fill=1, stroke=0)
    columns = [
        ("Araç Giydirme", "Kurumsal filo, yönlendirme ve kampanya uygulamaları."),
        ("Dijital Baskı", "Folyo, branda, one-way vision ve geniş format baskı."),
        ("Cephe Giydirme", "Kompozit, vinil ve geçici kampanya yüzeyleri."),
    ]
    col_w = (W - 120) / 3
    for i, (title, copy) in enumerate(columns):
        x = 56 + i * col_w
        c.setFillColor(ACCENT)
        c.setFont(BOLD, 17)
        c.drawString(x, 286, f"0{i + 1}")
        c.setFillColor(INK)
        c.setFont(BOLD, 11)
        c.drawString(x, 252, title)
        paragraph(c, copy, x, 229, col_w - 18, 8, 13, GREY)
    c.setFillColor(GREY)
    c.setFont(FONT, 8)
    c.drawString(56, 116, "Malzeme ve uygulama yöntemi keşif sonrasında projeye göre belirlenir.")
    footer(c, 5)
    c.showPage()


def page_six(c):
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(ACCENT)
    c.rect(0, 0, W * 0.32, H, fill=1, stroke=0)
    c.drawImage(str(ASSETS / "vrs-logo.png"), 44, H - 102, 150, 34, mask="auto", preserveAspectRatio=True)
    c.setFillColor(white)
    c.setFont(BOLD, 9)
    c.drawString(44, H - 170, "ATAŞEHİR / İSTANBUL")
    c.setFont(BOLD, 28)
    c.drawString(44, H - 221, "Projenizi")
    c.drawString(44, H - 255, "konuşalım.")
    c.setFont(FONT, 10)
    c.setFillColor(Color(1, 1, 1, alpha=0.73))
    c.drawString(44, 164, "0547 606 06 16")
    c.drawString(44, 144, "info@vrscreative.com")
    paragraph(c, "Küçükbakkalköy, Mavideniz Sk. No:2, 34750 Ataşehir / İstanbul", 44, 116, 140, 8, 12, Color(1, 1, 1, alpha=0.65))
    crop_image(c, ASSETS / "cephe-giydirme.jpg", W * 0.32, 0, W * 0.68, H)
    c.setFillColor(Color(0.05, 0.06, 0.07, alpha=0.52))
    c.rect(W * 0.32, 0, W * 0.68, H, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont(BOLD, 11)
    c.drawRightString(W - 42, 44, "vrscreative.com")
    c.setFont(FONT, 7)
    c.setFillColor(Color(1, 1, 1, alpha=0.65))
    c.drawRightString(W - 42, 28, "ÖRNEK KATALOG / GERÇEK TİCARİ TEKLİF DEĞİLDİR")
    c.showPage()


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("VRS Creative - Örnek Proje Kataloğu")
    c.setAuthor("VRS Creative")
    c.setSubject("Prototip web sitesi için örnek katalog")
    cover(c)
    page_two(c)
    page_three(c)
    page_four(c)
    page_five(c)
    page_six(c)
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    main()
