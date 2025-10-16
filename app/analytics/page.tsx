"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FeatureImportanceChart } from "@/components/feature-importance-chart"
import { ModelInfoCard } from "@/components/model-info-card"
import { EloChart } from "@/components/elo-chart"
import { ArrowLeft, TrendingUp, Target, Zap, Database } from "lucide-react"
import { mockModelMetrics } from "@/lib/mock-data"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-foreground">Model Analytics</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-chart-1" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-2xl font-bold text-foreground">{mockModelMetrics.accuracy}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Precision</p>
                  <p className="text-2xl font-bold text-foreground">{mockModelMetrics.precision}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latency</p>
                  <p className="text-2xl font-bold text-foreground">{mockModelMetrics.latency}ms</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Training Data</p>
                  <p className="text-xl font-bold text-foreground">
                    {(mockModelMetrics.trainingGames / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Model Details and Feature Importance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ModelInfoCard />
            <FeatureImportanceChart />
          </div>

          <EloChart />

          {/* Performance Over Time */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Model Performance Metrics</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Recall</span>
                    <span className="text-sm font-semibold text-foreground">{mockModelMetrics.recall}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-2" style={{ width: `${mockModelMetrics.recall}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">F1 Score</span>
                    <span className="text-sm font-semibold text-foreground">{mockModelMetrics.f1Score}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-chart-3" style={{ width: `${mockModelMetrics.f1Score}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold mb-3 text-foreground">Training Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Games</p>
                    <p className="font-semibold text-foreground">{mockModelMetrics.trainingGames.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Latency</p>
                    <p className="font-semibold text-foreground">{mockModelMetrics.latency}ms</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-semibold text-foreground">
                      {new Date(mockModelMetrics.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Architecture Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Model Architecture</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <h4 className="font-semibold mb-2 text-foreground">Random Forest + Positional Heuristics</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The model combines ensemble learning with chess-specific positional evaluation. It uses 500K+
                  historical games to train a Random Forest classifier that predicts optimal moves based on Elo ratings,
                  material balance, center control, piece mobility, and king safety metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold mb-2 text-sm text-foreground">Feature Engineering</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Elo rating differential</li>
                    <li>• Material balance scoring</li>
                    <li>• Positional heuristics</li>
                    <li>• Move sequence encoding</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-secondary/50">
                  <h4 className="font-semibold mb-2 text-sm text-foreground">Deployment</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AWS Lambda inference</li>
                    <li>• Docker containerization</li>
                    <li>• Sub-200ms latency</li>
                    <li>• Auto-scaling support</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
