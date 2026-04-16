import type {
  ChatExchangeResponse,
  ConclusionResponse,
  GameSnapshot
} from "../types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });

  if (!response.ok) {
    let message = `请求失败：${response.status}`;

    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) {
        message = body.message;
      }
    } catch {
      // 这里故意吞掉 JSON 解析错误，让外层统一走 message。
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

export function fetchBootstrap(): Promise<GameSnapshot> {
  return request<GameSnapshot>("/api/game/bootstrap");
}

export function sendChatMessage(
  contactId: string,
  text: string,
  clientRequestId?: string
): Promise<ChatExchangeResponse> {
  return request<ChatExchangeResponse>(`/api/chat/${contactId}`, {
    method: "POST",
    body: JSON.stringify({ text, clientRequestId })
  });
}

export function markContactRead(contactId: string): Promise<GameSnapshot> {
  return request<GameSnapshot>(`/api/contacts/${contactId}/read`, {
    method: "POST"
  });
}

export function submitConclusion(text: string): Promise<ConclusionResponse> {
  return request<ConclusionResponse>("/api/case/submit-conclusion", {
    method: "POST",
    body: JSON.stringify({ text })
  });
}

export function resetGame(): Promise<GameSnapshot> {
  return request<GameSnapshot>("/api/game/reset", {
    method: "POST"
  });
}
