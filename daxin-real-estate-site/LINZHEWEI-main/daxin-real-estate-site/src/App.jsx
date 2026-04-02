import { useState } from "react";

const lineLink = "https://line.me/R/ti/p/qdGwFGksVm";
const lineQr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(lineLink)}`;

function TextInput({ name, placeholder, value, onChange }) {
  return (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-red-200/80 bg-white/90 px-4 py-4 text-lg shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
      onChange={onChange}
    />
  );
}

function Card({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, className = "", ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export default function App() {
  const [buyForm, setBuyForm] = useState({ name: "", type: "", budget: "", contact: "" });
  const [sellForm, setSellForm] = useState({ name: "", type: "", needPrice: false, needTax: false, contact: "" });

  const buildBuyLineMessage = () => {
    const message = `您好，我想找房：
稱呼：${buyForm.name || "未填寫"}
想找的物件：${buyForm.type || "未填寫"}
預算：${buyForm.budget || "未填寫"}
聯絡方式：${buyForm.contact || "未填寫"}`;
    return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
  };

  const buildSellLineMessage = () => {
    const needs = [
      sellForm.needPrice ? "詢問附近實價登錄行情" : null,
      sellForm.needTax ? "粗估應繳稅額" : null,
    ].filter(Boolean);

    const message = `您好，我想賣屋：
稱呼：${sellForm.name || "未填寫"}
物件類型：${sellForm.type || "未填寫"}
需求：${needs.length ? needs.join("、") : "未填寫"}
聯絡方式：${sellForm.contact || "未填寫"}`;
    return `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;
  };

  const handleBuyChange = (e) => setBuyForm({ ...buyForm, [e.target.name]: e.target.value });

  const handleSellChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSellForm({ ...sellForm, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 p-6 text-gray-900"
      style={{ fontFamily: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif' }}
    >
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-2 rounded-[2rem] bg-white/70 p-6 text-center shadow-lg backdrop-blur-sm">
          <h1 className="bg-gradient-to-r from-red-700 via-rose-600 to-orange-500 bg-clip-text text-4xl font-bold text-transparent">
            林哲緯｜房地產顧問
          </h1>
          <p className="text-xl font-semibold text-gray-700">大心不動產經紀社｜專營雲林不動產</p>
          <p className="text-lg text-gray-600">雲林縣斗六市漢口路218號1樓</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border border-red-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm rounded-3xl">
            <CardContent className="space-y-4">
              <h2 className="text-center text-2xl font-bold text-red-700">您想找甚麼物件?</h2>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <TextInput name="name" value={buyForm.name} placeholder="稱呼" onChange={handleBuyChange} />
                <TextInput
                  name="type"
                  value={buyForm.type}
                  placeholder="想找的物件類型? 例:公寓、透天、農、建地"
                  onChange={handleBuyChange}
                />
                <TextInput name="budget" value={buyForm.budget} placeholder="預算" onChange={handleBuyChange} />
                <TextInput name="contact" value={buyForm.contact} placeholder="聯絡方式" onChange={handleBuyChange} />

                <Button
                  type="button"
                  className="w-full rounded-2xl bg-gradient-to-r from-red-700 to-orange-500 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.01]"
                  onClick={() => window.open(buildBuyLineMessage(), "_blank")}
                >
                  送出需求
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border border-red-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm rounded-3xl">
            <CardContent className="space-y-4">
              <h2 className="text-center text-2xl font-bold text-red-700">您想賣什麼物件？</h2>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <TextInput name="name" value={sellForm.name} placeholder="稱呼" onChange={handleSellChange} />

                <select
                  className="w-full rounded-2xl border border-red-200/80 bg-white/90 p-4 text-lg shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  onChange={handleSellChange}
                  name="type"
                  value={sellForm.type}
                >
                  <option value="">物件類型</option>
                  <option>農地</option>
                  <option>公寓</option>
                  <option>透天</option>
                  <option>建地</option>
                  <option>工業建地</option>
                  <option>其他</option>
                </select>

                <div className="space-y-3 text-lg">
                  <label className="block">
                    <input type="checkbox" name="needPrice" checked={sellForm.needPrice} onChange={handleSellChange} />{" "}
                    詢問附近實價登錄行情
                  </label>
                  <label className="block">
                    <input type="checkbox" name="needTax" checked={sellForm.needTax} onChange={handleSellChange} /> 粗估應繳稅額
                  </label>
                </div>

                <TextInput name="contact" value={sellForm.contact} placeholder="聯絡方式" onChange={handleSellChange} />

                <Button
                  type="button"
                  className="w-full rounded-2xl bg-gradient-to-r from-red-700 to-orange-500 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-[1.01]"
                  onClick={() => window.open(buildSellLineMessage(), "_blank")}
                >
                  送出賣屋需求
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5 rounded-[2rem] border border-green-100 bg-white/80 p-6 text-center shadow-lg backdrop-blur-sm">
          <a href={lineLink} target="_blank" rel="noreferrer" className="text-2xl font-bold text-green-600 underline">
            加 LINE 快速聯絡
          </a>

          <div className="flex flex-col items-center gap-3">
            <img
              src={lineQr}
              alt="LINE QR Code"
              className="h-44 w-44 rounded-2xl border-4 border-green-500 bg-white p-2 shadow-lg"
            />
            <p className="text-lg font-medium text-green-700">掃描 QR Code 或點上方連結加入 LINE</p>
          </div>
        </div>

        <div className="space-y-2 rounded-[2rem] bg-white/75 p-6 text-center text-xl shadow-lg backdrop-blur-sm">
          <p className="text-2xl">電話：0929-359-999</p>
          <p className="text-2xl font-bold text-green-600">LINE：0929359999</p>
          <p>經紀人證號（97）登字第00119號</p>
          <p>營業員證號（112）登字第433203號</p>
        </div>
      </div>

      <a
        href={lineLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 rounded-full bg-green-500 px-6 py-4 text-lg text-white shadow-xl"
      >
        LINE
      </a>
    </div>
  );
}
