export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} 消息穿梭机. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}