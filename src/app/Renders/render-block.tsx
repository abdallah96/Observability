export const RenderBlock = () => {
  return (
   <div className="mt-4 space-y-3 text-[11px]">
   <div className="flex gap-2">
     <div className="h-7 min-w-[90px] rounded-md bg-violet-500/80 px-3 py-1 text-[10px] font-medium text-slate-50 shadow-lg shadow-violet-500/40">
       getServerSideProps
     </div>
     <div className="h-7 min-w-[110px] rounded-md bg-amber-400/90 px-3 py-1 text-[10px] font-medium text-slate-950 shadow-lg shadow-amber-400/40">
       Hydration
     </div>
   </div>
   <div className="flex gap-2">
     <div className="h-7 min-w-[190px] rounded-md bg-amber-500/90 px-3 py-1 text-[10px] font-semibold text-slate-950 shadow-lg shadow-amber-500/50">
       ProductList: Massive Re-render
     </div>
   </div>
   <div className="flex gap-2">
     <div className="ml-[120px] h-7 min-w-[90px] rounded-md bg-fuchsia-500/80 px-3 py-1 text-[10px] font-medium text-slate-50 shadow-lg shadow-fuchsia-500/40">
       fetch(/api/products)
     </div>
   </div>
 </div>
  );
};

export default RenderBlock;