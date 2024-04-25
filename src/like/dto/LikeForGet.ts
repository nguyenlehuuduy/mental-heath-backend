import { ApiProperty } from "@nestjs/swagger";

export class LikeForGet {
	@ApiProperty()
	id: string;
	@ApiProperty()
	accountId: string;
	@ApiProperty()
	postId?: string;
	@ApiProperty()
	created_at?: Date;
	@ApiProperty()
	updated_at?: Date;
}
