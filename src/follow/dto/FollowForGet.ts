import { ApiProperty } from "@nestjs/swagger";

export class FollowForGet {
	@ApiProperty()
	id: string;
	@ApiProperty()
	fullName: string;
	@ApiProperty()
	followerId?: string;
	@ApiProperty()
	followingId?: string;
	@ApiProperty()
	senderId?: string;
	@ApiProperty()
	reciverId?: string;
	@ApiProperty()
	created_at?: Date;
	@ApiProperty()
	updated_at?: Date;
	
}
