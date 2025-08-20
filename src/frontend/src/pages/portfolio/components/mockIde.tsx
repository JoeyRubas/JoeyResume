
import React from "react";
import { TypeAnimation } from "react-type-animation";
import "./ide.css";

const CodeTyper: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const codeRef = React.useRef<HTMLDivElement>(null);

  const fullCode = `name: Deploy Frontend to Azure Static Web App\n\non:\n  push:\n    branches: [ main ]\n    paths:\n      - 'src/frontend/**'\n  workflow_dispatch:\n\nenv:\n  NODE_VERSION: '20.x'\n  APP_DIR: 'src/frontend'        \n  DIST_DIR: 'src/frontend/dist'\n\njobs:\n  build-and-deploy:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n        with:\n          submodules: true\n          lfs: false\n\n      - name: Setup Node\n        uses: actions/setup-node@v4\n        with:\n          node-version: \${{ env.NODE_VERSION }}\n          cache: npm\n          cache-dependency-path: '\${{ env.APP_DIR }}/package-lock.json'\n\n      - name: Install deps\n        run: npm ci\n        working-directory: \${{ env.APP_DIR }}\n\n      - name: Export public build vars\n        run: |\n          echo "VITE_API_URL=\${{ secrets.VITE_API_URL }}" >> $GITHUB_ENV\n          echo "VITE_SHOW_EDIT_FUNCTIONALITY=false" >> $GITHUB_ENV\n          echo "VITE_USE_MOCK_DATA=false" >> $GITHUB_ENV\n          echo "VITE_GITHUB_TOKEN=\${{ secrets.VITE_GITHUB_TOKEN }}" >> $GITHUB_ENV\n\n      - name: Debug environment variables\n        run: |\n          echo "VITE_API_URL is set: \${{ secrets.VITE_API_URL != '' }}"\n          echo "VITE_GITHUB_TOKEN is set: \${{ secrets.VITE_GITHUB_TOKEN != '' }}"\n          echo "Environment variables exported to GITHUB_ENV"\n\n      - name: Build (Vite)\n        env:\n          NODE_ENV: production\n        run: npm run build\n        working-directory: \${{ env.APP_DIR }}\n\n      \n      - name: Include staticwebapp.config.json\n        run: |\n          if [ -f "\${{ env.APP_DIR }}/staticwebapp.config.json" ]; then\n            cp "\${{ env.APP_DIR }}/staticwebapp.config.json" "\${{ env.DIST_DIR }}/"\n          fi\n\n      \n      - name: Validate artifact\n        run: |\n          test -f "\${{ env.DIST_DIR }}/index.html"\n          grep -q '<script type="module"' "\${{ env.DIST_DIR }}/index.html"\n          ! grep -q '/src/main\\.' "\${{ env.DIST_DIR }}/index.html" || (echo "ERROR: dev index.html detected"; exit 1)\n\n      - name: Deploy to Azure Static Web Apps (upload dist as site root)\n        uses: Azure/static-web-apps-deploy@v1\n        with:\n          azure_static_web_apps_api_token: \${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}\n          action: upload\n\n          app_location: \${{ env.DIST_DIR }}\n          output_location: ''         \n\n          skip_app_build: true       \n          skip_api_build: true\n          repo_token: \${{ secrets.GITHUB_TOKEN }}`;

  const generateSequence = (code: string) => {
    const lines = code.split('\n');
    const sequence: (string | number)[] = [];
    for (let i = 0; i < lines.length; i++) {
      const currentCode = lines.slice(0, i + 1).join('\n');
      sequence.push(currentCode);
      sequence.push(100);
    }
    return sequence;
  };

  const codeSequence = generateSequence(fullCode);

  return (
    <div
      ref={codeRef}
      style={{
        fontFamily: 'Fira Code, Consolas, Monaco, monospace',
        fontSize: '13px',
        lineHeight: '1.4',
        color: '#d4d4d4',
        whiteSpace: 'pre-wrap',
        margin: 0,
        padding: '12px',
        minHeight: '200px'
      }}
    >
      {isVisible && (
        <TypeAnimation
          sequence={codeSequence}
          speed={80}
          cursor={true}
          repeat={0}
          style={{ display: 'block' }}
        />
      )}
    </div>
  );
};

export const MockIDE: React.FC<{ ideVisible: boolean }> = ({ ideVisible }) => {
  const ideRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="mock-ide" ref={ideRef}>
      <div className="mockNav">
        <div className="ide-title-bar">
          <div className="window-controls">
            <span className="control close"></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>
          <div className="file-tabs">
            <div className="tab active">Portfolio.tsx</div>
            <div className="tab">styles.css</div>
          </div>
        </div>
      </div>
      <div className="ide-content">
        <div className="mockSidebar">
          <div className="sidebar-header">EXPLORER</div>
          <div className="file-tree">
            <div className="folder expanded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              src
            </div>
            <div className="file-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              Portfolio.tsx
            </div>
            <div className="file-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              styles.css
            </div>
            <div className="folder">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6L10 4z"/>
              </svg>
              components
            </div>
            <div className="folder">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6L10 4z"/>
              </svg>
              assets
            </div>
          </div>
        </div>
        <div className="mockEditorBody">
          <div className="line-numbers">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i + 1} className="line-number">{i + 1}</div>
            ))}
          </div>
          <div className="code-content">
            <CodeTyper isVisible={ideVisible} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockIDE;