import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers';
import Image from "next/image";


export default function NewTweet({user}: {user: User}){
    const AddTweet =async (formData: FormData) => {
        "use server";
        const text = String(formData.get('Text'));
        const supabase = createServerActionClient<Database>({cookies});
        await supabase.from('tweets').insert({body: text, user_id: user.id });
        console.log("Text submitted");
    }

    return(
        <form className="border border-gray-800 border-t-0" action={AddTweet}>
            <div className="flex py-8 px-4">
                <div className="bg-red-200 h-12 w-12">
                    <Image src={user.user_metadata.avatar_url} alt="user avatar" width={48} height={48}/>
                </div>
                <input name="Text" className="bg-blue-200 flex-1" />
            </div>
        </form>
    )
}