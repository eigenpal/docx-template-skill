import React, { useState, useCallback, useRef, useEffect } from "react";

type Mode = "compare" | "render";

function App() {
  const [mode, setMode] = useState<Mode>("compare");
  const [originalFile, setOriginalFile] = useState<ArrayBuffer | null>(null);
  const [templateFile, setTemplateFile] = useState<ArrayBuffer | null>(null);
  const [originalName, setOriginalName] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [sampleData, setSampleData] = useState<string>(
    JSON.stringify(
      {
        companyName: "Acme Corporation",
        date: "January 15, 2025",
        items: [
          { description: "Widget A", quantity: 10, unitPrice: "$5.00" },
        ],
      },
      null,
      2
    )
  );
  const [renderedFile, setRenderedFile] = useState<ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileDrop = useCallback(
    (
      setter: (f: ArrayBuffer) => void,
      nameSetter: (n: string) => void
    ) => {
      return (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith(".docx")) {
          const reader = new FileReader();
          reader.onload = () => {
            setter(reader.result as ArrayBuffer);
            nameSetter(file.name);
          };
          reader.readAsArrayBuffer(file);
        }
      };
    },
    []
  );

  const handleFileInput = useCallback(
    (setter: (f: ArrayBuffer) => void, nameSetter: (n: string) => void) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.name.endsWith(".docx")) {
          const reader = new FileReader();
          reader.onload = () => {
            setter(reader.result as ArrayBuffer);
            nameSetter(file.name);
          };
          reader.readAsArrayBuffer(file);
        }
      };
    },
    []
  );

  const renderTemplate = useCallback(async () => {
    if (!templateFile) return;
    setError(null);
    try {
      const PizZip = (await import("pizzip")).default;
      const Docxtemplater = (await import("docxtemplater")).default;
      const zip = new PizZip(templateFile);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      const data = JSON.parse(sampleData);
      doc.render(data);
      const out = doc.getZip().generate({ type: "arraybuffer" });
      setRenderedFile(out);
    } catch (err: any) {
      setError(err.message || "Render failed");
      setRenderedFile(null);
    }
  }, [templateFile, sampleData]);

  useEffect(() => {
    if (mode === "render" && templateFile) {
      renderTemplate();
    }
  }, [mode, templateFile, renderTemplate]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>DOCX Template Preview</h1>
        <div style={styles.modeToggle}>
          <button
            style={{
              ...styles.modeBtn,
              ...(mode === "compare" ? styles.modeBtnActive : {}),
            }}
            onClick={() => setMode("compare")}
          >
            Compare
          </button>
          <button
            style={{
              ...styles.modeBtn,
              ...(mode === "render" ? styles.modeBtnActive : {}),
            }}
            onClick={() => setMode("render")}
          >
            Render
          </button>
        </div>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.content}>
        {mode === "compare" ? (
          <div style={styles.splitPane}>
            <FilePanel
              label="Original"
              fileName={originalName}
              file={originalFile}
              onDrop={handleFileDrop(setOriginalFile, setOriginalName)}
              onFileInput={handleFileInput(setOriginalFile, setOriginalName)}
            />
            <div style={styles.divider} />
            <FilePanel
              label="Template"
              fileName={templateName}
              file={templateFile}
              onDrop={handleFileDrop(setTemplateFile, setTemplateName)}
              onFileInput={handleFileInput(setTemplateFile, setTemplateName)}
            />
          </div>
        ) : (
          <div style={styles.splitPane}>
            <div style={styles.panel}>
              <h3 style={styles.panelLabel}>Sample Data (JSON)</h3>
              <textarea
                style={styles.jsonEditor}
                value={sampleData}
                onChange={(e) => setSampleData(e.target.value)}
              />
              <button style={styles.renderBtn} onClick={renderTemplate}>
                Render Template
              </button>
            </div>
            <div style={styles.divider} />
            <FilePanel
              label="Rendered Output"
              fileName={templateName ? `rendered_${templateName}` : ""}
              file={renderedFile}
              onDrop={handleFileDrop(setTemplateFile, setTemplateName)}
              onFileInput={handleFileInput(setTemplateFile, setTemplateName)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function FilePanel({
  label,
  fileName,
  file,
  onDrop,
  onFileInput,
}: {
  label: string;
  fileName: string;
  file: ArrayBuffer | null;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={styles.panel}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <h3 style={styles.panelLabel}>{label}</h3>
      {file ? (
        <div style={styles.docxViewer}>
          <p style={styles.fileName}>{fileName}</p>
          <p style={styles.fileInfo}>
            {(file.byteLength / 1024).toFixed(1)} KB
          </p>
          <p style={styles.hint}>
            DOCX loaded. Use @eigenpal/docx-js-editor for rich preview.
          </p>
        </div>
      ) : (
        <div
          style={styles.dropZone}
          onClick={() => inputRef.current?.click()}
        >
          <p>Drop a .docx file here</p>
          <p style={styles.dropZoneHint}>or click to browse</p>
          <input
            ref={inputRef}
            type="file"
            accept=".docx"
            style={{ display: "none" }}
            onChange={onFileInput}
          />
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f5f5f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e0e0e0",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
  },
  modeToggle: {
    display: "flex",
    gap: "4px",
    background: "#f0f0f0",
    borderRadius: "6px",
    padding: "2px",
  },
  modeBtn: {
    padding: "6px 16px",
    border: "none",
    borderRadius: "4px",
    background: "transparent",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  },
  modeBtnActive: {
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  error: {
    padding: "8px 24px",
    background: "#fee",
    color: "#c00",
    fontSize: "13px",
  },
  content: {
    flex: 1,
    overflow: "hidden",
  },
  splitPane: {
    display: "flex",
    height: "100%",
  },
  panel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    overflow: "auto",
  },
  panelLabel: {
    margin: "0 0 12px 0",
    fontSize: "14px",
    fontWeight: 600,
    color: "#333",
  },
  divider: {
    width: "1px",
    background: "#e0e0e0",
  },
  dropZone: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#888",
  },
  dropZoneHint: {
    fontSize: "12px",
    color: "#aaa",
    marginTop: "4px",
  },
  docxViewer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
  },
  fileName: {
    fontWeight: 600,
    fontSize: "14px",
    margin: "0 0 4px 0",
  },
  fileInfo: {
    fontSize: "12px",
    color: "#888",
    margin: "0 0 12px 0",
  },
  hint: {
    fontSize: "12px",
    color: "#aaa",
    textAlign: "center",
    padding: "0 24px",
  },
  jsonEditor: {
    flex: 1,
    fontFamily: "monospace",
    fontSize: "13px",
    padding: "12px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    resize: "none",
    background: "#fff",
    minHeight: "200px",
  },
  renderBtn: {
    marginTop: "12px",
    padding: "8px 16px",
    background: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "13px",
  },
};

export default App;
