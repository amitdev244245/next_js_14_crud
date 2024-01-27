import userModel from "../../model/userModel"
import { redirect } from "next/navigation";

export default function Add() {
    // [-----LOGIC: ADD USER-----]
    async function addUser(req: any) {
        "use server"
        try {
            // fetch user data
            const user = new userModel({
                name: req.get("name")?.valueOf(),
                mobile: req.get("mobile")?.valueOf(),
                email: req.get("email")?.valueOf()
            });

            // existing user check
            const existingUser = await userModel.findOne({ email: user.email });

            // save user data
            if (existingUser) {
                console.log('User already exists');
            } else {
                await user.save()
                    .then(() => console.log("User Added Successfully"))
                    .catch(() => console.log("Some error occurred while creating user"))
            }

        }
        catch (error) {
            console.log(error);
        }

        redirect('/');
    }

    return (
        <main className="border border-black rounded-lg p-3 w-1/3 mx-auto mt-3">
            <h1 className="text-3xl text-center font-bold">Add User</h1>
            <form action={addUser}>
                <div className="mb-2">
                    <label htmlFor="name" className="text-lg">Name</label><br />
                    <input type="text" name="name" id="name" placeholder="Enter your name" className="bg-slate-200 p-3 w-[100%] rounded" />
                </div>
                <div className="mb-2">
                    <label htmlFor="mobile" className="text-lg">Mobile</label><br />
                    <input type="tel" name="mobile" id="mobile" placeholder="Enter mobile number" className="bg-slate-200 p-3 w-[100%] rounded" />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="text-lg">Email</label><br />
                    <input type="text" name="email" id="email" placeholder="Enter email" className="bg-slate-200 p-3 w-[100%] rounded" />
                </div>
                <button type="submit" className="bg-black text-white hover:bg-green-800 p-3 rounded">Submit</button>
            </form>
        </main>
    )
}
