// "use client";
// import {
//   Navbar,
//   NavBody,
//   NavItems,
//   MobileNav,
//   NavbarLogo,
//   NavbarButton,
//   MobileNavHeader,
//   MobileNavToggle,
//   MobileNavMenu,
// } from "@/components/ui/resizable-navbar";
// import { useState } from "react";
// import AccessSwitch from "./AccessSwitch";

// type VisibilityToggleProps = {
//   isPublic: boolean;
//   onToggle: (value: boolean) => void;
// };

// export function NavbarCreateSnippet({
//   isPublic,
//   onToggle,
// }: VisibilityToggleProps) {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="relative w-full">
//       <Navbar className="sm:mt-7">
//         {/* Desktop Navigation */}
//         <NavBody>
//           <div/>
//           {/* <NavItems items={navItems} /> */}
//           <div className="flex items-center gap-4">
//             <AccessSwitch isPublic={isPublic} onToggle={onToggle} />
//             <NavbarButton variant="secondary" className="font-semibold">
//               Discard
//             </NavbarButton>
//             <NavbarButton
//               variant="primary"
//               className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-semibold"
//             >
//               Save Snippet
//             </NavbarButton>
//           </div>
//         </NavBody>

//         {/* Mobile Navigation */}
//         <MobileNav>
//           <MobileNavHeader>
//             <div/>  
//             <MobileNavToggle
//               isOpen={isMobileMenuOpen}
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             />
//           </MobileNavHeader>

//           <MobileNavMenu
//             isOpen={isMobileMenuOpen}
//             onClose={() => setIsMobileMenuOpen(false)}
//           >
//             <div className="flex w-full flex-col gap-4">
//               <AccessSwitch isPublic={isPublic} onToggle={onToggle} />
//               <NavbarButton
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 variant="secondary"
//                 className="w-full font-semibold"
//               >
//                 Discard
//               </NavbarButton>
//               <NavbarButton
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 variant="primary"
//                 className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-semibold w-full"
//               >
//                 Save Snippet
//               </NavbarButton>
//             </div>
//           </MobileNavMenu>
//         </MobileNav>
//       </Navbar>

//       {/* Navbar */}
//     </div>
//   );
// }
"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import AccessSwitch from "./AccessSwitch";

type VisibilityToggleProps = {
  isPublic: boolean;
  onToggle: (value: boolean) => void;
};

export function NavbarCreateSnippet({isPublic, onToggle} : VisibilityToggleProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar className="mt-5">
        {/* Desktop Navigation - normal behavior */}
        <NavBody>
          <div />
          <div className="flex items-center gap-4">
            <AccessSwitch isPublic={isPublic} onToggle={onToggle} />
            <NavbarButton variant="secondary" className="font-semibold">Discard</NavbarButton>
            <NavbarButton variant="primary" className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-semibold">Save Snippet</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation - normal spacing since button is above */}
        <MobileNav className="md:hidden">
          <MobileNavHeader>
            <div />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-4 p-4">
              <AccessSwitch isPublic={isPublic} onToggle={onToggle} />
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full font-semibold"
              >
                Discard
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-indigo-500/80 hover:bg-indigo-600 text-white font-semibold"
              >
                Save Snippet
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}