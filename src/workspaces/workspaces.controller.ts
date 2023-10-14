import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';

import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
export class WorkspacesController {
	constructor(private readonly workspacesService: WorkspacesService) {}

	@Get('/:userId')
	getMyWorkspaces(@Param('userId', ParseUUIDPipe) userId: string) {
		return this.workspacesService.findMyWorkspace(userId);
	}
}
