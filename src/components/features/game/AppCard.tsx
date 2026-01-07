import { View, Text, Image } from "react-native";
import { SteamAppFromStore } from "../../../types/steam";

interface Props {
  app: SteamAppFromStore;
}

export function AppCard({ app }: Props) {
  if (!app) return null;

  const { name, type, tiny_image, price } = app;
  const imageUrl = tiny_image || "https://via.placeholder.com/150";

  return (
    <View style={{
      backgroundColor: "#2a2a2a",
      padding: 12,
      borderRadius: 12,
      marginBottom: 12
    }}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 150, borderRadius: 12 }}
        resizeMode="cover"
      />
      <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 8, fontSize: 16 }}>
        {name}
      </Text>
      <Text style={{ color: "#aaa", marginTop: 2, fontSize: 12 }}>
        {type.toUpperCase()}
      </Text>

      {price && (
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
      )}
    </View>
  );
}
