"use client"

import { useState } from "react"
import { User, Store, Bell, Shield, Save, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({
    name: "Rendi",
    email: "renditest@gmail.com",
    phone: "8438732878",
  })
  const [store, setStore] = useState({
    name: "Ternak Ayam Rendi",
    address: "Jl. Kp Cigore",
    phone: "(+62) 843-8732-878",
    description: "Penyedia ayam dan telur segar berkualitas premium.",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orders: true,
    stock: true,
  })

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
    alert("Pengaturan berhasil disimpan!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola pengaturan akun dan toko Anda</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
          <TabsTrigger value="profile" className="rounded-lg gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900">
            <User className="h-4 w-4" /> Profil
          </TabsTrigger>
          <TabsTrigger value="store" className="rounded-lg gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900">
            <Store className="h-4 w-4" /> Toko
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900">
            <Bell className="h-4 w-4" /> Notifikasi
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Profil Admin</CardTitle>
              <CardDescription>Perbarui informasi akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                  R
                </div>
                <Button variant="outline" className="rounded-xl">Ganti Foto</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>No. Telepon</Label>
                  <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Store Tab */}
        <TabsContent value="store">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Informasi Toko</CardTitle>
              <CardDescription>Pengaturan toko yang ditampilkan di website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Toko</Label>
                  <Input value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>No. Telepon Toko</Label>
                  <Input value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Alamat</Label>
                <Input value={store.address} onChange={(e) => setStore({ ...store, address: e.target.value })} className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea value={store.description} onChange={(e) => setStore({ ...store, description: e.target.value })} className="rounded-xl" rows={3} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="rounded-2xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Notifikasi</CardTitle>
              <CardDescription>Atur preferensi notifikasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notifikasi Email</p>
                  <p className="text-sm text-muted-foreground">Terima update via email</p>
                </div>
                <Switch checked={notifications.email} onCheckedChange={(c) => setNotifications({ ...notifications, email: c })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notification</p>
                  <p className="text-sm text-muted-foreground">Notifikasi browser</p>
                </div>
                <Switch checked={notifications.push} onCheckedChange={(c) => setNotifications({ ...notifications, push: c })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pesanan Baru</p>
                  <p className="text-sm text-muted-foreground">Notifikasi saat ada pesanan</p>
                </div>
                <Switch checked={notifications.orders} onCheckedChange={(c) => setNotifications({ ...notifications, orders: c })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Stok Menipis</p>
                  <p className="text-sm text-muted-foreground">Alert saat stok rendah</p>
                </div>
                <Switch checked={notifications.stock} onCheckedChange={(c) => setNotifications({ ...notifications, stock: c })} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl px-8"
        >
          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  )
}
