import { Inject, Injectable } from '@nestjs/common';
import { Endpoint } from '@/server/api/endpoint-base.js';
import { DI } from '@/di-symbols.js';
import type { BlockingsRepository } from '@/models/_.js';
import { GetterService } from '../GetterService.js';
import { ApiError } from '../error.js';
import { UserEntityService } from '@/core/entities/UserEntityService.js';
import { RemoteUserResolveService } from '@/core/RemoteUserResolveService.js';

export const meta = {
	tags: ['meta'],
	requireCredential: true,
	res: {
		type: 'object',
		oneOf: [
			{ type: 'object', ref: 'MetaLite' },
			{ type: 'object', ref: 'MetaDetailed' },
		],
	},
	allowGet: true
} as const;

export const paramDef = {
	type: 'object',
	properties: {
		detail: { type: 'boolean', default: true },
	},
	required: [],
} as const;

@Injectable()
export default class extends Endpoint<typeof meta, typeof paramDef> { // eslint-disable-line import/no-default-export
	constructor(
		@Inject(DI.blockingsRepository)
		private blockingsRepository: BlockingsRepository,
		private userEntityService: UserEntityService,
		private remoteUserResolveService: RemoteUserResolveService,
	) {
		super(meta, paramDef, async (ps, me) => {
			const BlockList = await this.blockingsRepository.find({where: {blockeeId: me?.id}});

			//わ
			let BlockerList = [];
			for (let I = 0; I < BlockList.length; I++) {
				const Block = BlockList[I];
				const User = await this.userEntityService.pack(Block.blockerId);
				BlockerList.push(User);
			}

			return BlockerList;
		});
	}
}