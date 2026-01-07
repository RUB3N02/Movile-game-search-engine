//de momento tiro con esto para probar
import { View, Text, Image } from 'react-native';
import { SteamSearchGame } from '../../../types/steam';

interface Props {
    game: SteamSearchGame;

}
export function GameCard({ game }: Props) {

  return (
    <View className="bg-zinc-900 rounded-2xl p-3">
      <Image
        source={{ uri: game.tiny_image }}
        className="h-40 rounded-xl"
      />

      <Text className="text-white font-bold mt-2">
        {game.name}
      </Text>
      {game.price && (
        <Text className="text-green-400 mt-1">
          {game.price.free
            ? 'Gratis'
            : `$${(game.price.final / 100).toFixed(2)}`}
        </Text>
      )}
    </View>
  );
}