import userModel from "../../../model/userModel"
import { redirect } from "next/navigation";

export default async function Edit({ params }: any) {
    // find user data by id
    const findUserById = await userModel.findOne({ _id: params.id });

    // [-----LOGIC: EDIT USER-----]
    async function editUserById(req: any) {
        "use server"
        // fetch user data
        const userData = {
            name: req.get("name")?.valueOf(),
            mobile: req.get("mobile")?.valueOf(),
            email: req.get("email")?.valueOf()
        };

        // update user data
        await userModel.findByIdAndUpdate({ _id: params.id }, userData);

        redirect('/');
    }

    return (
        <main className="border border-black rounded-lg p-3 w-1/3 mx-auto mt-3">
            <h1 className="text-3xl text-center font-bold">Edit User</h1>
            <form action={editUserById}>
                <div className="mb-2">
                    <label htmlFor="name" className="text-lg">Name</label><br />
                    <input type="text" name="name" id="name" placeholder="Enter your name" className="bg-slate-200 p-3 w-[100%] rounded" defaultValue={findUserById?.name} />
                </div>
                <div className="mb-2">
                    <label htmlFor="mobile" className="text-lg">Mobile</label><br />
                    <input type="tel" name="mobile" id="mobile" placeholder="Enter mobile number" className="bg-slate-200 p-3 w-[100%] rounded" defaultValue={findUserById?.mobile} />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="text-lg">Email</label><br />
                    <input type="text" name="email" id="email" placeholder="Enter email" className="bg-slate-200 p-3 w-[100%] rounded" defaultValue={findUserById?.email} />
                </div>
                <button type="submit" className="bg-black text-white hover:bg-green-800 p-3 rounded">Submit</button>
            </form>
        </main>
    )
}
