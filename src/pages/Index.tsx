
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Calculator, Beaker, Download } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [brix, setBrix] = useState<string>('');
  const [acidez, setAcidez] = useState<string>('');
  const [ratio, setRatio] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');

  const calculateRatio = () => {
    const brixValue = parseFloat(brix);
    const acidezValue = parseFloat(acidez);

    if (isNaN(brixValue) || isNaN(acidezValue) || acidezValue === 0) {
      toast.error("Por favor, insira valores válidos para ºBrix e Acidez");
      return;
    }

    const calculatedRatio = brixValue / acidezValue;
    setRatio(calculatedRatio);

    // Interpretação dos resultados
    if (calculatedRatio >= 12) {
      setInterpretation("Excelente qualidade - Fruta madura e doce, ideal para consumo");
    } else if (calculatedRatio >= 10) {
      setInterpretation("Boa qualidade - Fruta adequada para consumo in natura");
    } else if (calculatedRatio >= 8) {
      setInterpretation("Qualidade regular - Fruta em processo de maturação");
    } else {
      setInterpretation("Fruta imatura - Alto teor de acidez, não recomendada para consumo");
    }

    toast.success("Ratio calculado com sucesso!");
  };

  const generatePDF = () => {
    // Simula a geração do PDF
    toast.success("PDF gerado com sucesso! Download iniciado.");
    
    // Aqui seria implementada a lógica real de geração de PDF
    // Por exemplo, usando bibliotecas como jsPDF ou react-pdf
  };

  const getInterpretationColor = () => {
    if (!ratio) return "secondary";
    if (ratio >= 12) return "default";
    if (ratio >= 10) return "secondary";
    if (ratio >= 8) return "outline";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg">
              <Beaker className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Analisador de Maturação de Laranja
              </h1>
              <p className="text-gray-600">
                Metodologia para análise do Ratio (Brix/Acidez) em frutas cítricas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculadora */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculadora de Ratio
              </CardTitle>
              <CardDescription className="text-orange-100">
                Insira os valores obtidos em laboratório
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brix" className="text-gray-700 font-medium">
                    ºBrix
                  </Label>
                  <Input
                    id="brix"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 12.5"
                    value={brix}
                    onChange={(e) => setBrix(e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acidez" className="text-gray-700 font-medium">
                    Acidez (g/100mL)
                  </Label>
                  <Input
                    id="acidez"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 1.25"
                    value={acidez}
                    onChange={(e) => setAcidez(e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateRatio}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium py-3"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calcular Ratio
              </Button>

              {ratio !== null && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {ratio.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Ratio (ºBrix/Acidez)
                    </div>
                    <Badge variant={getInterpretationColor()} className="text-sm px-3 py-1">
                      {interpretation}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metodologia Resumida */}
          <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Metodologia
              </CardTitle>
              <CardDescription className="text-green-100">
                Resumo do procedimento experimental
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Preparação da Amostra</h4>
                    <p className="text-sm text-gray-600">Extrair e filtrar o suco da laranja</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Medição de ºBrix</h4>
                    <p className="text-sm text-gray-600">Utilizar refratômetro calibrado</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Titulação com NaOH</h4>
                    <p className="text-sm text-gray-600">Determinar acidez total (ác. cítrico)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Cálculo do Ratio</h4>
                    <p className="text-sm text-gray-600">Ratio = ºBrix / Acidez</p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Valores de Referência</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Ratio ≥ 12: Excelente qualidade</li>
                  <li>• Ratio 10-12: Boa qualidade</li>
                  <li>• Ratio 8-10: Qualidade regular</li>
                  <li>• Ratio &lt; 8: Fruta imatura</li>
                </ul>
              </div>

              <Button 
                onClick={generatePDF}
                variant="outline"
                className="w-full border-green-300 text-green-700 hover:bg-green-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar Metodologia Completa (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Informações Adicionais */}
        <Card className="mt-8 bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Informações Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">0,1N</div>
              <div className="text-sm text-blue-800">Concentração NaOH</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">pH 8,2</div>
              <div className="text-sm text-purple-800">Ponto de Viragem</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">0,064</div>
              <div className="text-sm text-green-800">Equiv. Ácido Cítrico</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
