import protobuf from "protobufjs";
import protoJson from "../frecency-proto.json";
import { normalizeUrl } from "./urlUtils";
const FRECENCY_SETTINGS_TYPE =
  "discord_protos.discord_users.v1.FrecencyUserSettings";

const root = protobuf.Root.fromJSON(protoJson);
const FrecencySettings = root.lookupType(FRECENCY_SETTINGS_TYPE);

function base64ToBytes(base64) {
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}

function decodeProtobuf(bytes) {
  const message = FrecencySettings.decode(bytes);

  return FrecencySettings.toObject(message, {
    longs: String,
    enums: String,
    defaults: true,
  });
}

function getFavoriteGifs(settings) {
  return settings.favoriteGifs?.gifs || {};
}

function toFavoriteItem([sourcePageUrl, gif]) {
  return {
    sourcePageUrl,
    assetUrl: normalizeUrl(gif?.src || sourcePageUrl),
    format: gif?.format || "",
    width: gif?.width || 0,
    height: gif?.height || 0,
    sourceOrder: gif?.order ?? 0,
  };
}

export function decodeFavorites(rawInput) {
  try {
    const input = rawInput.trim();
    const bytes = base64ToBytes(input);
    const settings = decodeProtobuf(bytes);
    const favoriteGifs = getFavoriteGifs(settings);

    return Object.entries(favoriteGifs)
      .map(toFavoriteItem)
      .sort((left, right) => left.sourceOrder - right.sourceOrder);
  } catch {
    throw new Error(
      "Could not decode favorites. Make sure you pasted the correct base64 string.",
    );
  }
}
