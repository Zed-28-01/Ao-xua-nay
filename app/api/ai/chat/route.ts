import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { ThinkingLevel } from "@google/genai";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  currentOutfitContext?: {
    era?: string;
    event?: string;
    style?: string;
    items?: string[];
  };
  enableHighThinking?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages, currentOutfitContext, enableHighThinking = true } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp danh sách tin nhắn hợp lệ." },
        { status: 400 }
      );
    }

    const contextKicker = currentOutfitContext
      ? `\n[Bối cảnh trang phục hiện tại của người dùng]:
- Thời kỳ: ${currentOutfitContext.era || "Chưa chọn"}
- Bối cảnh sự kiện: ${currentOutfitContext.event || "Chưa chọn"}
- Phong cách: ${currentOutfitContext.style || "Tự do"}
- Các món đồ đang thử: ${currentOutfitContext.items?.join(", ") || "Chưa có"}\n`
      : "";

    const systemInstruction = `Bạn là "Cố vấn Thời trang Áo Xưa Nay" - Chuyên gia Sử học Việt Nam kiêm Stylist Gen Z phong cách hiện đại.
Giọng văn của bạn: Am hiểu sâu sắc điển chế cổ phục (thời Lý, Trần, Lê, Nguyễn, Tân thời), nhưng giao tiếp gần gũi, sành điệu, trẻ trung, dùng thuật ngữ thời trang hiện đại (layering, silhouette, monochrome, unisex, streetwear, tonal).

Nhiệm vụ của bạn:
1. Tư vấn cách phối đồ Việt phục với trang phục hiện đại sao cho vừa cá tính vừa tôn trọng văn hóa.
2. Phân tích ngữ cảnh xuất hiện, ý nghĩa hoa văn (hoa sen, cúc dây, thủy ba, chữ Thọ, rồng, phượng).
3. Hướng dẫn sửa chữa các lỗi cấm kỵ (như tránh dùng hoa văn Rồng 5 móng cho dạo phố, tránh mặc áo yếm đơn lẻ đi chùa, v.v.).
4. Đưa ra mẹo mặc đẹp cho học sinh, sinh viên với chi phí hợp lý và tính ứng dụng cao trong đời sống thường nhật.
${contextKicker}`;

    // Convert messages to Gemini contents format
    const contents = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Candidate models to try in sequence to avoid 429 quota exhaustion
    const candidateModels = enableHighThinking
      ? ["gemini-3.1-pro-preview", "gemini-3.1-flash-lite", "gemini-3.8-flash"]
      : ["gemini-3.1-flash-lite", "gemini-3.1-pro-preview", "gemini-3.8-flash"];

    for (const modelToUse of candidateModels) {
      try {
        const isPro = modelToUse === "gemini-3.1-pro-preview";
        const response = await ai.models.generateContent({
          model: modelToUse,
          contents,
          config: {
            systemInstruction,
            ...(isPro && enableHighThinking
              ? {
                  thinkingConfig: {
                    thinkingLevel: ThinkingLevel.HIGH,
                  },
                }
              : {}),
          },
        });

        if (response.text) {
          return NextResponse.json({
            reply: response.text,
            modelUsed: modelToUse,
            thinkingEnabled: isPro && enableHighThinking,
          });
        }
      } catch {
        // Continue to next model without logging noisy ApiError 429 to console
      }
    }

    // Built-in expert Gen Z Stylist fallback responses
    const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || "";
    let expertReply =
      "Chào bạn! Khi phối Việt phục dạo phố (Streetwear), bí quyết nằm ở nghệ thuật Layering: bạn có thể khoác Áo Giao Lĩnh hoặc Áo Đối Khâm bên ngoài áo thun croptop, kết hợp quần wide-leg và chunky sneakers để vừa tôn vinh di sản vừa cực kỳ năng động nhé!";

    if (lastUserMsg.includes("rồng") || lastUserMsg.includes("5 móng")) {
      expertReply =
        "Lưu ý quan trọng nè: Họa tiết Rồng 5 móng là biểu tượng độc quyền của Thiên tử (Hoàng đế). Khi phối đồ thường phục hay Streetwear dạo phố, bạn nên đổi sang hoa văn hoa sen, cúc dây Lý - Trần hoặc rồng 4 móng để vừa sành điệu vừa chuẩn xác về mặt văn hóa nhé!";
    } else if (lastUserMsg.includes("yếm") || lastUserMsg.includes("chùa")) {
      expertReply =
        "Áo yếm là phục trang nội y cổ điển rất duyên dáng. Tuy nhiên khi đi lễ đền chùa hoặc chốn tôn nghiêm, tuyệt đối không mặc yếm đơn lẻ; hãy khoác thêm áo Tứ Thân, Ngũ Thân hoặc áo Giao Lĩnh cổ chéo kín đáo bên ngoài để giữ trọn sự trang nghiêm nhé!";
    } else if (lastUserMsg.includes("nguyễn") || lastUserMsg.includes("ngũ thân")) {
      expertReply =
        "Áo Ngũ Thân thời Nguyễn tượng trưng cho Tứ thân phụ mẫu che chở đứa con (ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín). Bạn có thể phối áo Ngũ Thân tay chẽn cùng quần jeans ống đứng và giày da loafer để tạo phong cách Retro Cố đô cực kỳ thanh lịch!";
    }

    return NextResponse.json({
      reply: expertReply,
      modelUsed: "offline-expert-stylist",
      thinkingEnabled: false,
    });
  } catch (error) {
    return NextResponse.json({
      reply:
        "Cổ phục Việt Nam mang vẻ đẹp bất tận! Bạn muốn tìm hiểu về Áo Giao Lĩnh thời Lý - Trần hay Áo Ngũ Thân thời Nguyễn?",
      modelUsed: "fallback",
    });
  }
}
