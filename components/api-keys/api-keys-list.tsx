"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Eye, EyeOff, Trash2, Check, Key } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { deleteApiKey } from "@/app/actions/api-actions"
import { toast } from "@/components/ui/use-toast"

interface ApiKey {
  id: number
  name: string
  key: string
  type: string
  createdAt: string
  lastUsed: string | null
}

interface ApiKeysListProps {
  apiKeys: ApiKey[]
}

export function ApiKeysList({ apiKeys }: ApiKeysListProps) {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})
  const [copiedKey, setCopiedKey] = useState<number | null>(null)

  const toggleKeyVisibility = (id: number) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getKeyTypeColor = (type: string) => {
    switch (type) {
      case "read":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/30 dark:text-blue-300"
      case "write":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-300"
      case "full":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 dark:bg-emerald-900/30 dark:text-emerald-300"
      default:
        return ""
    }
  }

  const handleCopyKey = (id: number, key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)

    toast({
      title: "API Key copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleDeleteKey = async (id: number) => {
    const result = await deleteApiKey(id.toString())

    if (result.success) {
      toast({
        title: "API Key deleted",
        description: "The API key has been deleted successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the API key.",
        variant: "destructive",
      })
    }
  }

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-lg">
        <div className="rounded-full bg-primary/10 p-3 mx-auto w-fit mb-4">
          <Key className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No API keys yet</h3>
        <p className="text-muted-foreground mb-6">Create your first API key to start accessing the MetaSpeak API.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id} className="group">
              <TableCell className="font-medium">{apiKey.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {visibleKeys[apiKey.id] ? apiKey.key : `${apiKey.key.substring(0, 10)}...`}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    {visibleKeys[apiKey.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopyKey(apiKey.id, apiKey.key)}
                  >
                    {copiedKey === apiKey.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getKeyTypeColor(apiKey.type)}>
                  {apiKey.type.charAt(0).toUpperCase() + apiKey.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{new Date(apiKey.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : "Never"}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your API key and may break any
                        applications using it.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground"
                        onClick={() => handleDeleteKey(apiKey.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

