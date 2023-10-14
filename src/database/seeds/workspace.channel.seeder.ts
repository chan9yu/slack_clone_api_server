import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { WorkspaceEntity } from '../../workspaces/entities';
import { ChannelEntity } from '../../channels/entities';

export default class WorkspaceSeeder implements Seeder {
	async run(dataSource: DataSource): Promise<any> {
		const workspaceRepository = dataSource.getRepository(WorkspaceEntity);
		await workspaceRepository.insert([
			{
				id: '1',
				name: 'Welcome',
				url: 'welcome'
			}
		]);

		const channelRepository = dataSource.getRepository(ChannelEntity);
		await channelRepository.insert([
			{
				id: '1',
				name: 'general',
				workspaceId: '1',
				private: false
			}
		]);
	}
}
