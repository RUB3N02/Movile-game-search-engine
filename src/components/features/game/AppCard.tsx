import { View, Text, Image } from "react-native";
import { SteamAppFromStore } from "../../../types/steam";

interface Props {
  app: SteamAppFromStore;
}

export function AppCard({ app }: Props) {
  if (!app) return null;

  const { name, tiny_image, price } = app;

  return (
    <View
      style={{
        backgroundColor: "#1f1f1f",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      {/* Imagen solo si existe */}
      {tiny_image ? (
        <Image
          source={{ uri: tiny_image }}
          style={{ width: "100%", height: 150, borderRadius: 12 }}
          resizeMode="cover"
        />
      ) : null}

      {/* Nombre */}
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          marginTop: 8,
          fontSize: 16,
        }}
      >
        {name}
      </Text>

      {/* Precio */}
      {price ? (
        <View style={{ marginTop: 4 }}>
          {price.free ? (
            <Text style={{ color: "#0f0", fontWeight: "600" }}>Gratis</Text>
          ) : (
            <>
              <Text style={{ color: "#0f0", fontWeight: "600" }}>
                ${ (price.final / 100).toFixed(2) }
              </Text>
              <Text style={{ color: "#aaa", fontSize: 12 }}>
                Inicial: ${ (price.initial / 100).toFixed(2) }, Descuento: {price.discount_percent}%
              </Text>
            </>
          )}
        </View>
      ) : null}
    </View>
  );
}
