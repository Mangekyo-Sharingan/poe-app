'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Power, Edit2, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Device = {
  id: string
  name: string
  mac: string
  ip: string
  isOnline: boolean
}

export default function Page() {
  const [devices, setDevices] = useState<Device[]>([])
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)

  useEffect(() => {
    const savedDevices = localStorage.getItem('wolDevices')
    if (savedDevices) {
      setDevices(JSON.parse(savedDevices))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wolDevices', JSON.stringify(devices))
  }, [devices])

  const addOrUpdateDevice = (device: Omit<Device, 'id' | 'isOnline'>) => {
    if (editingDevice) {
      setDevices(devices.map(d => d.id === editingDevice.id ? { ...d, ...device, isOnline: d.isOnline } : d))
      setEditingDevice(null)
    } else {
      setDevices([...devices, { ...device, id: Date.now().toString(), isOnline: false }])
    }
  }

  const removeDevice = (id: string) => {
    setDevices(devices.filter(d => d.id !== id))
  }

  const wakeDevice = async (mac: string) => {
    try {
      console.log('Attempting to wake device with MAC:', mac);
      const response = await fetch('http://localhost:3001/wake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mac })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      console.log(data.message);
      setDevices(devices.map(d => d.mac === mac ? { ...d, isOnline: true } : d));
      // You might want to add a user-facing notification here
      alert(`Wake-on-LAN packet sent to ${mac}`);
    } catch (error) {
      console.error('Error waking device:', error);
      // Show an error message to the user
      alert(`Failed to wake device: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Wake-on-LAN Dashboard</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingDevice ? 'Edit Device' : 'Add New Device'}</CardTitle>
          </CardHeader>
          <CardContent>
            <DeviceForm onSubmit={addOrUpdateDevice} initialDevice={editingDevice} />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              onWake={() => wakeDevice(device.mac)}
              onEdit={() => setEditingDevice(device)}
              onRemove={() => removeDevice(device.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function DeviceForm({ onSubmit, initialDevice }: { onSubmit: (device: Omit<Device, 'id' | 'isOnline'>) => void, initialDevice: Device | null }) {
  const [name, setName] = useState(initialDevice?.name || '')
  const [mac, setMac] = useState(initialDevice?.mac || '')
  const [ip, setIp] = useState(initialDevice?.ip || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, mac, ip })
    setName('')
    setMac('')
    setIp('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="name">Device Name</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Living Room PC" />
        </div>
        <div>
          <Label htmlFor="mac">MAC Address</Label>
          <Input id="mac" value={mac} onChange={e => setMac(e.target.value)} required pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$" placeholder="e.g. 00:11:22:33:44:55" />
        </div>
        <div>
          <Label htmlFor="ip">IP Address</Label>
          <Input id="ip" value={ip} onChange={e => setIp(e.target.value)} required pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$" placeholder="e.g. 192.168.1.100" />
        </div>
      </div>
      <Button type="submit" className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        {initialDevice ? 'Update Device' : 'Add Device'}
      </Button>
    </form>
  )
}

function DeviceCard({ device, onWake, onEdit, onRemove }: { device: Device, onWake: () => void, onEdit: () => void, onRemove: () => void }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">{device.name}</CardTitle>
        <Badge variant={device.isOnline ? "success" : "secondary"}>
          {device.isOnline ? 'Online' : 'Offline'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-500">MAC: {device.mac}</p>
          <p className="text-sm text-gray-500">IP: {device.ip}</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={onWake} disabled={device.isOnline} className="flex-1">
            <Power className="mr-2 h-4 w-4" />
            Wake
          </Button>
          <Button onClick={onEdit} variant="outline" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button onClick={onRemove} variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}