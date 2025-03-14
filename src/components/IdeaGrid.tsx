interface IdeaGridProps {
    children: React.ReactNode;
}

export default function IdeaGrid({ children }: IdeaGridProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center gap-4 p-8 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] md:place-items-start">
      {children}
    </div>
  );
}
