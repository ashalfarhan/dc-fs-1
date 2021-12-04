import Card from "./Card";

export default function Uploading() {
  return (
    <Card>
      <h1 className="font-poppins font-medium">Uploading...</h1>
      <div className="h-2 w-full bg-gray-200 rounded-lg relative overflow-hidden">
        <div className="w-full h-full absolute inset-0 animate-marque-right">
          <div className="h-2 bg-blue-400 w-1/4 rounded-lg"></div>
        </div>
      </div>
    </Card>
  )
}
