import { useState } from "react";
import { FlatList, Text, TextInput, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppCard } from "../src/components/features/game/AppCard";
import { useSearchApps, SteamAppFromStore } from "../src/hooks/useSearchApps";

export default function App() {
  const [term, setTerm] = useState(""); // vacío al inicio
  const { apps, loading, loadMore } = useSearchApps(term);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1f1f1f" }}>
        <View style={{ flex: 1, padding: 16, backgroundColor: "#1f1f1f" }}>
          {/* Buscador */}
          <TextInput
            placeholder="Buscar app..."
            placeholderTextColor="#a1a1aa"
            value={term}
            onChangeText={setTerm}
            style={{
              backgroundColor: "#2a2a2a",
              color: "#fff",
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 12,
            }}
          />

          {/* Lista de apps */}
          {!term ? (
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 24 }}>
              Ingrese un término para buscar.
            </Text>
          ) : loading && apps.length === 0 ? (
            <ActivityIndicator size="large" color="#0f0" style={{ marginTop: 24 }} />
          ) : apps.length === 0 ? (
            <Text style={{ color: "#fff", textAlign: "center", marginTop: 24 }}>
              No se encontraron apps.
            </Text>
          ) : (
            <FlatList
              data={apps}
              keyExtractor={(item: SteamAppFromStore) => item.id.toString()}
              renderItem={({ item }) => <AppCard app={item} />}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading ? <ActivityIndicator size="small" color="#0f0" style={{ margin: 12 }} /> : null
              }
              contentContainerStyle={{ paddingBottom: 16 }}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
