import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "./users.schema";

@Schema()
export class Post extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: true, ref: User.name })
    authorId: MongooseSchema.Types.ObjectId;
    @Prop({ type: String })
    message: string;
    @Prop({ type: [String] })
    fileNames: [string];
    @Prop({ type: Number })
    likes: number;
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

const schema = SchemaFactory.createForClass(Post);
schema.index({ createdAt: -1 });
schema.index({ authorId: 1 });
export const PostSchema = schema;