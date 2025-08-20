import React from "react";
import { TypeAnimation } from "react-type-animation";

interface MockIdeProps {
  isVisible: boolean;
  className?: string;
}

export const MockIde: React.FC<MockIdeProps> = ({ isVisible, className = "" }) => {
  const codeContent = `name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Build application
      run: npm run build`;

  const WindowControls = () => (
    <div className="mock-ide__window-controls">
      <span className="mock-ide__control mock-ide__control--close"></span>
      <span className="mock-ide__control mock-ide__control--minimize"></span>
      <span className="mock-ide__control mock-ide__control--maximize"></span>
    </div>
  );

  const FileTabs = () => (
    <div className="mock-ide__tabs">
      <div className="mock-ide__tab mock-ide__tab--active">
        <span className="mock-ide__tab-icon">📄</span>
        <span className="mock-ide__tab-text">.github/workflows/ci.yml</span>
      </div>
    </div>
  );

  const FileExplorer = () => (
    <div className="mock-ide__explorer">
      <div className="mock-ide__explorer-header">EXPLORER</div>
      <div className="mock-ide__explorer-content">
        <div className="mock-ide__folder">
          <span className="mock-ide__folder-icon">📁</span>
          <span>.github</span>
        </div>
        <div className="mock-ide__folder mock-ide__folder--nested">
          <span className="mock-ide__folder-icon">📁</span>
          <span>workflows</span>
        </div>
        <div className="mock-ide__file mock-ide__file--nested mock-ide__file--active">
          <span className="mock-ide__file-icon">📄</span>
          <span>ci.yml</span>
        </div>
      </div>
    </div>
  );

  const LineNumbers = () => (
    <div className="mock-ide__line-numbers">
      {Array.from({ length: 27 }, (_, i) => (
        <div key={i + 1} className="mock-ide__line-number">
          {i + 1}
        </div>
      ))}
    </div>
  );

  const CodeEditor = () => (
    <div className="mock-ide__code">
      {isVisible ? (
        <TypeAnimation
          sequence={[codeContent]}
          wrapper="span"
          speed={70}
          style={{
            fontSize: '14px',
            lineHeight: '1.5',
            color: '#d4d4d4',
            fontFamily: "'Cascadia Code', 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
            whiteSpace: 'pre',
            display: 'block'
          }}
        />
      ) : (
        <pre style={{ 
          fontSize: '14px', 
          lineHeight: '1.5', 
          color: '#d4d4d4',
          fontFamily: "'Cascadia Code', 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace"
        }}>
          {/* Placeholder */}
        </pre>
      )}
    </div>
  );

  return (
    <div className={`mock-ide ${className}`}>
      <div className="mock-ide__header">
        <WindowControls />
        <div className="mock-ide__title">Portfolio Project - Visual Studio Code</div>
      </div>
      <FileTabs />
      <div className="mock-ide__content">
        <div className="mock-ide__sidebar">
          <FileExplorer />
        </div>
        <div className="mock-ide__editor">
          <LineNumbers />
          <div className="mock-ide__code-area">
            <CodeEditor />
          </div>
        </div>
      </div>
    </div>
  );
};
