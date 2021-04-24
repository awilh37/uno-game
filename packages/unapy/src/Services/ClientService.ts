import GameHistoryService from "@/Services/GameHistoryService"
import PlayerService from "@/Services/PlayerService"
import SocketService from "@/Services/SocketService"

class ClientService {
	async dispatchGameHistoryConsolidated (playerId?: string): Promise<void> {
		let connectedPlayerIds: string[] = []

		if (playerId) {
			connectedPlayerIds = [playerId]
		} else {
			connectedPlayerIds = await PlayerService.getAllPlayerIds()
		}

		await Promise.all(
			connectedPlayerIds.map(async playerId => {
				const gameHistory = await GameHistoryService.retrieveGameHistory(playerId)

				if (gameHistory) {
					SocketService.emitPlayerEvent(playerId, "GameHistoryConsolidated", gameHistory)
				}
			}),
		)
	}

	async dispatchGameListUpdated (): Promise<void> {
		const connectedPlayerIds = await PlayerService.getAllPlayerIds()

		connectedPlayerIds.forEach(playerId => {
			SocketService.emitPlayerEvent(playerId, "GameListUpdated", [])
		})
	}
}

export default new ClientService()
