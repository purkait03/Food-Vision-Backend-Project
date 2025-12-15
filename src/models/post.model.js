import mongoose, {Schema} from "mongoose";

const postSchema = ({
    imageFile: {
        type: String,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)



export const Post = mongoose.model("Post", postSchema)