import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">404 - Page introuvable</h1>
          <p>La page que vous recherchez n&apos;existe pas.</p>
          <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Retour à l&apos;accueil</Link>
        </div>
      );
}

export default NotFound;
