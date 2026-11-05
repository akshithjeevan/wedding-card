import { weddingData } from "@/data/wedding";

export type CardFormat = "status" | "print";

interface Dimensions {
  width: number;
  height: number;
}

const FORMAT_CONFIG: Record<CardFormat, Dimensions> = {
  // 9:16 vertical ratio for WhatsApp Status / Instagram Stories (Retina 1080 x 1920)
  status: { width: 1080, height: 1920 },
  // 5:7 standard invitation / photo card ratio for A5 / physical print (1200 x 1680)
  print: { width: 1200, height: 1680 },
};

/**
 * Draws an ultra-high-resolution, luxury Kerala wedding invitation card on HTML5 Canvas.
 * Exports directly to PNG Data URL without any external servers or CORS dependencies.
 */
export async function generateInvitationCard(format: CardFormat = "status"): Promise<string> {
  if (typeof window === "undefined") return "";

  // Ensure all custom Google web fonts are loaded
  if (document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue even if font ready check fails
    }
  }

  const { width, height } = FORMAT_CONFIG[format];
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const isStatus = format === "status";
  const scale = isStatus ? 1 : 1;

  // 1. Background - Warm Kerala Ivory with subtle radial gradient
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    100,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.7
  );
  bgGrad.addColorStop(0, "#FFFDF8");
  bgGrad.addColorStop(0.7, "#FFF9ED");
  bgGrad.addColorStop(1, "#F6ECE0");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle paper grain dots
  ctx.fillStyle = "rgba(196, 154, 67, 0.035)";
  for (let x = 0; x < width; x += 36) {
    for (let y = 0; y < height; y += 36) {
      ctx.beginPath();
      ctx.arc(x + ((y % 72) ? 18 : 0), y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Dual Gold Foil Borders
  const outerMargin = isStatus ? 48 : 52;
  const innerMargin = isStatus ? 62 : 68;

  // Outer thin gold frame
  ctx.strokeStyle = "#C49A43";
  ctx.lineWidth = 1.8;
  ctx.strokeRect(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2);

  // Inner decorative gold frame
  ctx.strokeStyle = "#C49A43";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2);

  // Corner ornamental flourishes
  const drawCornerFlourish = (cx: number, cy: number, flipX: number, flipY: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(flipX, flipY);

    ctx.strokeStyle = "#C49A43";
    ctx.fillStyle = "#E5C67C";
    ctx.lineWidth = 1.5;

    // Corner diamond
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(9, 0);
    ctx.lineTo(0, 9);
    ctx.lineTo(-9, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Corner bracket curves
    ctx.beginPath();
    ctx.arc(18, 18, 14, Math.PI, 1.5 * Math.PI, false);
    ctx.stroke();

    ctx.restore();
  };

  drawCornerFlourish(innerMargin, innerMargin, 1, 1);
  drawCornerFlourish(width - innerMargin, innerMargin, -1, 1);
  drawCornerFlourish(innerMargin, height - innerMargin, 1, -1);
  drawCornerFlourish(width - innerMargin, height - innerMargin, -1, -1);

  // 3. Central Monogram Badge
  const centerX = width / 2;
  let curY = isStatus ? 170 : 150;

  // Circular Gold Seal
  const badgeRadius = isStatus ? 48 : 44;
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, curY, badgeRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFDF9";
  ctx.fill();
  ctx.strokeStyle = "#C49A43";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Inner dashed gold ring
  ctx.beginPath();
  ctx.arc(centerX, curY, badgeRadius - 6, 0, Math.PI * 2);
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#E5C67C";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);

  // Monogram letters "VJ"
  ctx.font = `italic bold ${isStatus ? 44 : 40}px "Great Vibes", "Playfair Display", serif`;
  ctx.fillStyle = "#700D20";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("VJ", centerX, curY + 2);
  ctx.restore();

  // 4. Section Title
  curY += isStatus ? 90 : 80;
  ctx.textAlign = "center";

  ctx.font = `600 ${isStatus ? 20 : 19}px "Inter", sans-serif`;
  ctx.fillStyle = "#C49A43";
  ctx.letterSpacing = "6px";
  ctx.fillText("WEDDING INVITATION", centerX, curY);

  // Flourish line under title
  curY += 28;
  drawGoldDivider(ctx, centerX, curY, isStatus ? 260 : 280);

  // 5. Parent message
  curY += isStatus ? 54 : 46;
  ctx.font = `italic 400 ${isStatus ? 22 : 21}px "Lora", Georgia, serif`;
  ctx.fillStyle = "#665749";
  ctx.fillText("With great pleasure, we cordially invite you to the wedding of our beloved son", centerX, curY);

  // 6. Groom Name & Details
  curY += isStatus ? 95 : 82;
  ctx.font = `normal ${isStatus ? 84 : 76}px "Great Vibes", cursive, serif`;
  ctx.fillStyle = "#700D20";
  ctx.shadowColor = "rgba(112, 13, 32, 0.15)";
  ctx.shadowBlur = 4;
  ctx.fillText(weddingData.couple.groom.fullName, centerX, curY);
  ctx.shadowBlur = 0;

  curY += isStatus ? 42 : 36;
  ctx.font = `italic 400 ${isStatus ? 21 : 19}px "Lora", serif`;
  ctx.fillStyle = "#665749";
  ctx.fillText(weddingData.couple.groom.description || "Son of T. Rajan & T. J. Kusumakumari", centerX, curY);

  // Connector "with"
  curY += isStatus ? 50 : 42;
  ctx.save();
  ctx.strokeStyle = "rgba(196, 154, 67, 0.6)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - 90, curY);
  ctx.lineTo(centerX - 35, curY);
  ctx.moveTo(centerX + 35, curY);
  ctx.lineTo(centerX + 90, curY);
  ctx.stroke();

  ctx.font = `italic 500 ${isStatus ? 22 : 20}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillStyle = "#C49A43";
  ctx.fillText("with", centerX, curY + 6);
  ctx.restore();

  // 7. Bride Name & Details
  curY += isStatus ? 66 : 58;
  ctx.font = `normal ${isStatus ? 84 : 76}px "Great Vibes", cursive, serif`;
  ctx.fillStyle = "#700D20";
  ctx.shadowColor = "rgba(112, 13, 32, 0.15)";
  ctx.shadowBlur = 4;
  ctx.fillText(weddingData.couple.bride.fullName, centerX, curY);
  ctx.shadowBlur = 0;

  curY += isStatus ? 42 : 36;
  ctx.font = `italic 400 ${isStatus ? 21 : 19}px "Lora", serif`;
  ctx.fillStyle = "#665749";
  ctx.fillText(weddingData.couple.bride.parents, centerX, curY);

  curY += isStatus ? 28 : 25;
  ctx.font = `400 ${isStatus ? 19 : 17}px "Lora", serif`;
  ctx.fillStyle = "#76685A";
  ctx.fillText(weddingData.couple.bride.address, centerX, curY);

  // Subtitle poem
  curY += isStatus ? 52 : 44;
  ctx.font = `italic 400 ${isStatus ? 21 : 19}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillStyle = "#123D25";
  ctx.fillText("Two hearts, one beautiful journey. Celebrating the beginning of forever.", centerX, curY);

  // Flourish divider
  curY += 26;
  drawGoldDivider(ctx, centerX, curY, isStatus ? 280 : 300);

  // 8. Date, Muhurtham & Venue Container Card
  curY += isStatus ? 48 : 40;
  const cardW = isStatus ? 860 : 960;
  const cardH = isStatus ? 250 : 230;
  const cardX = centerX - cardW / 2;

  // Background for details
  ctx.fillStyle = "rgba(255, 253, 249, 0.85)";
  ctx.strokeStyle = "rgba(196, 154, 67, 0.5)";
  ctx.lineWidth = 1.5;
  roundRect(ctx, cardX, curY, cardW, cardH, 16);
  ctx.fill();
  ctx.stroke();

  // Inside Details Card:
  // Date
  const insideY1 = curY + (isStatus ? 48 : 42);
  ctx.font = `bold ${isStatus ? 28 : 26}px "Playfair Display", Georgia, serif`;
  ctx.fillStyle = "#123D25";
  ctx.fillText("Saturday, 21 November 2026", centerX, insideY1);

  ctx.font = `italic 400 ${isStatus ? 20 : 18}px "Lora", serif`;
  ctx.fillStyle = "#C49A43";
  ctx.fillText(`(1202 Vrischikam 5)`, centerX, insideY1 + (isStatus ? 28 : 25));

  // Muhurtham
  const insideY2 = insideY1 + (isStatus ? 68 : 62);
  ctx.font = `bold ${isStatus ? 26 : 24}px "Lora", serif`;
  ctx.fillStyle = "#700D20";
  ctx.fillText("Muhurtham: 11:45 AM to 12:00 Noon", centerX, insideY2);

  // Venue
  const insideY3 = insideY2 + (isStatus ? 46 : 42);
  ctx.font = `bold ${isStatus ? 24 : 22}px "Playfair Display", Georgia, serif`;
  ctx.fillStyle = "#123D25";
  ctx.fillText(weddingData.venue.name, centerX, insideY3);

  ctx.font = `400 ${isStatus ? 18 : 17}px "Lora", serif`;
  ctx.fillStyle = "#665749";
  ctx.fillText(`${weddingData.venue.addressLine1}, ${weddingData.venue.addressLine2}`, centerX, insideY3 + 24);

  // 9. Host & Family Details
  curY += cardH + (isStatus ? 50 : 42);
  ctx.font = `600 ${isStatus ? 18 : 17}px "Inter", sans-serif`;
  ctx.fillStyle = "#C49A43";
  ctx.letterSpacing = "3px";
  ctx.fillText("CORDIALLY INVITED BY", centerX, curY);

  curY += 28;
  ctx.font = `bold ${isStatus ? 24 : 22}px "Playfair Display", Georgia, serif`;
  ctx.fillStyle = "#123D25";
  ctx.fillText(weddingData.family.hosts, centerX, curY);

  curY += 24;
  ctx.font = `400 ${isStatus ? 18 : 17}px "Lora", serif`;
  ctx.fillStyle = "#665749";
  ctx.fillText(weddingData.family.address, centerX, curY);

  curY += 24;
  ctx.font = `500 ${isStatus ? 18 : 17}px "Inter", sans-serif`;
  ctx.fillStyle = "#700D20";
  ctx.fillText(`Ph: ${weddingData.family.phoneNumbers.map((p) => p.display).join(" • ")}`, centerX, curY);

  // 10. Warm Regards
  curY += isStatus ? 42 : 36;
  ctx.font = `italic 400 ${isStatus ? 18 : 17}px "Lora", serif`;
  ctx.fillStyle = "#76685A";
  ctx.fillText(`With Best Compliments: ${weddingData.regards.join(" • ")}`, centerX, curY);

  // 11. Footer blessings
  curY += isStatus ? 48 : 40;
  ctx.font = `italic 500 ${isStatus ? 20 : 18}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillStyle = "#123D25";
  ctx.fillText("Bless us with your auspicious presence and prayers.", centerX, curY);

  return canvas.toDataURL("image/png");
}

function drawGoldDivider(ctx: CanvasRenderingContext2D, cx: number, cy: number, width: number) {
  ctx.save();
  const half = width / 2;

  // Left Line
  const gradLeft = ctx.createLinearGradient(cx - half, cy, cx - 20, cy);
  gradLeft.addColorStop(0, "rgba(196, 154, 67, 0)");
  gradLeft.addColorStop(1, "rgba(196, 154, 67, 0.9)");
  ctx.strokeStyle = gradLeft;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(cx - half, cy);
  ctx.lineTo(cx - 20, cy);
  ctx.stroke();

  // Right Line
  const gradRight = ctx.createLinearGradient(cx + 20, cy, cx + half, cy);
  gradRight.addColorStop(0, "rgba(196, 154, 67, 0.9)");
  gradRight.addColorStop(1, "rgba(196, 154, 67, 0)");
  ctx.strokeStyle = gradRight;
  ctx.beginPath();
  ctx.moveTo(cx + 20, cy);
  ctx.lineTo(cx + half, cy);
  ctx.stroke();

  // Center Diamond
  ctx.fillStyle = "#E5C67C";
  ctx.strokeStyle = "#C49A43";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 6);
  ctx.lineTo(cx + 6, cy);
  ctx.lineTo(cx, cy + 6);
  ctx.lineTo(cx - 6, cy);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
