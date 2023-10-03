import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers';


export default function NewTweet(){
    const AddTweet =async (formData: FormData) => {
        "use server";
        const text = String(formData.get('Text'));
        const supabase = createServerActionClient<Database>({cookies});
        const {data: {user} } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('tweets').insert({body: text, user_id: user.id });
        console.log("Text submitted");
        }
    }

    return(
        <form action={AddTweet}>
            <input name="Text" className="bg-inherit" />
        </form>
    )
}