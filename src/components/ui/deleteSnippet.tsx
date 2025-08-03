import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { NavbarButton } from "./resizable-navbar";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteSnippet({ snippetId }: { snippetId: string }) {
  const router = useRouter();
  const discardSnippet = async () => {
    try {
      console.log(snippetId);
      await deleteDoc(doc(db, "snippet", snippetId));
      toast.success("Deleted snippet");
      router.push("/dashboard");
    } catch (err) {
      toast.error(`Error occured ${err}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <NavbarButton variant="secondary" className="font-semibold">
          Discard
        </NavbarButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            snippet.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={discardSnippet}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import CTA from "./CTA";
// import sparkForm from "@/app/actions/sparkForm";
// import { Toaster } from "react-hot-toast";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export function ConfirmSpark() {
//   const [isDisabled, setDisabled] = useState(false);
//   const [isOpen, setOpen] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     setDisabled(true);
//     await toast.promise(
//       async () => {
//         const res = await sparkForm(formData);
//         setDisabled(false);
//         setOpen(false);
//         if (!res?.success)
//           throw new Error(res?.error || "Something went wrong");
//       },
//       {
//         loading: "Creating your subscription...",
//         success: "Check your inbox to confirm your subscription!",
//         error: (err) => (err ? err.message : "Unknown error occured"),
//       }
//     );
//   }

//   return (
//     <>
//       <div>
//         <Toaster />
//       </div>
//       <Dialog open={isOpen} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <CTA />
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
//             <DialogHeader>
//               <DialogTitle>Join Daily Spark</DialogTitle>
//               <DialogDescription>
//                 Enter your details to get personalized morning motivation and
//                 weather updates.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-2">
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" name="name" placeholder="Your Name" required />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="place">City (for weather data)</Label>
//               <Input
//                 id="place"
//                 name="place"
//                 placeholder="e.g., Mumbai"
//                 required
//               />
//             </div>
//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button variant="outline">Cancel</Button>
//               </DialogClose>
//               <Button type="submit" disabled={isDisabled}>
//                 Subscribe
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
