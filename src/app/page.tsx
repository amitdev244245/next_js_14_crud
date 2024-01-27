import dbConnect from "./utils/dbConnect"
import userModel from "./model/userModel"
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  // Connect to database
  dbConnect();

  // [-----LOGIC: READ USERS-----]
  const getUsers = await userModel.find();

  // [-----LOGIC: DELETE USER-----]
  const deleteUser = async (req: any) => {
    "use server"
    // fetch user id
    const id = req.get("id")?.valueOf();

    // delete user data
    await userModel.deleteOne({ _id: id });

    redirect('/');
  }

  return (
    <main className="p-3 w-1/2 mx-auto mt-4">
      <div className="flex justify-between">
        <h1 className="text-3xl text-center font-bold mb-8">Home</h1>
        <Link href="/add">
          <button className="text-center bg-black text-white font-medium py-3 px-6 rounded-lg mb-8">Add</button>
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {getUsers.map((item, id) => {
            return <tr key={id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.mobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <form action={deleteUser}>
                  <Link href={`/edit/${item.id}`}>
                    <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">Edit</button>
                  </Link>
                  <input type="hidden" name="id" id="id" value={item.id} />
                  <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete</button>
                </form>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </main>
  )
}
