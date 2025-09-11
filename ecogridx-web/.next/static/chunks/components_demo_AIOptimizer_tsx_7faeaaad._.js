(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/demo/AIOptimizer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>AIOptimizer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AIOptimizer() {
    _s();
    const [isOptimizing, setIsOptimizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [optimizationComplete, setOptimizationComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedRecommendation, setSelectedRecommendation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedAlert, setSelectedAlert] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAlertOptimization, setShowAlertOptimization] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [highlightedNode, setHighlightedNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [glowingCard, setGlowingCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Mapping zones to their corresponding node coordinates for highlighting
    const zoneNodeMapping = {
        "Residential North": {
            x: 300,
            y: 150,
            nodeId: "residential-north"
        },
        "Residential South": {
            x: 900,
            y: 150,
            nodeId: "residential-south"
        },
        "Commercial West": {
            x: 200,
            y: 450,
            nodeId: "commercial-west"
        },
        "Industrial East": {
            x: 1000,
            y: 450,
            nodeId: "industrial-east"
        },
        "Critical Systems": {
            x: 600,
            y: 100,
            nodeId: "critical-systems"
        },
        "Solar A": {
            x: 150,
            y: 80,
            nodeId: "solar-a"
        },
        "Wind B": {
            x: 1050,
            y: 80,
            nodeId: "wind-b"
        },
        "Storage West": {
            x: 50,
            y: 520,
            nodeId: "storage-west"
        },
        "Storage East": {
            x: 1150,
            y: 520,
            nodeId: "storage-east"
        },
        "Central Grid": {
            x: 600,
            y: 300,
            nodeId: "power-hub"
        }
    };
    const handleRecommendationClick = (rec)=>{
        // Toggle selection: if already selected, unselect it
        if (selectedRecommendation === rec.id) {
            // Unselect the recommendation
            setSelectedRecommendation(null);
            setGlowingCard(null);
            setHighlightedNode(null);
        } else {
            // Select the recommendation and make card glow
            setSelectedRecommendation(rec.id);
            setGlowingCard(rec.id);
            // Highlight the corresponding node
            if (zoneNodeMapping[rec.zone]) {
                setHighlightedNode(rec.zone);
            }
        }
    };
    const handleAcceptOptimization = (rec)=>{
        setIsOptimizing(true);
        setSelectedRecommendation(rec.id);
        // Add a small delay to ensure DOM is ready, then scroll to the energy network map
        setTimeout(()=>{
            const mapElement = document.querySelector('.energy-network-map');
            if (mapElement) {
                mapElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            } else {
                // Fallback: try to find by ID or alternative selector
                const networkCard = document.getElementById('energy-network-card') || document.querySelector('[data-card="energy-network"]') || document.querySelector('h3:contains("Energy Network Graph")');
                if (networkCard) {
                    networkCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'nearest'
                    });
                }
            }
        }, 100);
        // Simulate optimization process
        setTimeout(()=>{
            // Remove the recommendation from the list
            setRecommendations((prev)=>prev.filter((r)=>r.id !== rec.id));
            // Clear highlights and selections
            setHighlightedNode(null);
            setGlowingCard(null);
            setSelectedRecommendation(null);
            setIsOptimizing(false);
            // Update grid data to reflect optimization
            setGridData((prev)=>({
                    ...prev,
                    gridBalance: Math.min(98, prev.gridBalance + Math.random() * 5),
                    efficiency: Math.min(96, prev.efficiency + Math.random() * 3)
                }));
        }, 3000);
    };
    // Function to determine if a connection should be highlighted
    const getConnectionStyle = (fromZone, toZone)=>{
        if (highlightedNode && (highlightedNode === fromZone || highlightedNode === toZone)) {
            return {
                stroke: "#00ff00",
                strokeWidth: "12",
                opacity: "1",
                filter: "url(#highlightGlow)",
                strokeDasharray: "none",
                animation: "pulse 1.5s infinite"
            };
        }
        return {};
    };
    // Function to determine if a node should be highlighted
    const getNodeStyle = (zoneName)=>{
        if (highlightedNode === zoneName) {
            return {
                filter: "url(#nodeHighlight)",
                stroke: "#00ff00",
                strokeWidth: "6"
            };
        }
        return {};
    };
    // Add CSS animation for zoom effect
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "AIOptimizer.useEffect": ()=>{
            const style = document.createElement('style');
            style.textContent = "\n      @keyframes zoom {\n        0%, 100% { transform: scale(1); }\n        50% { transform: scale(1.05); }\n      }\n    ";
            document.head.appendChild(style);
            return ({
                "AIOptimizer.useEffect": ()=>{
                    document.head.removeChild(style);
                }
            })["AIOptimizer.useEffect"];
        }
    }["AIOptimizer.useEffect"], []);
    // Real-time grid data
    const [gridData, setGridData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        currentLoad: 2650,
        efficiency: 87.3,
        gridBalance: 92.1,
        storageLevel: 68.5,
        carbonReduction: 15.2,
        lastUpdated: new Date()
    });
    // AI Recommendations with detected issues
    const [recommendations, setRecommendations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            issue: "Load Imbalance Detected",
            zone: "Residential North",
            severity: "High",
            description: "Residential North experiencing 15% higher load than optimal capacity",
            aiAction: "Redistribute 180MW to Commercial West and Industrial East zones",
            currentMetrics: {
                gridBalance: 78.2,
                storage: 45.3,
                efficiency: 82.1
            },
            projectedMetrics: {
                gridBalance: 94.8,
                storage: 58.7,
                efficiency: 91.3
            },
            confidenceScore: 94.2,
            coordinates: {
                x: 25,
                y: 20
            },
            status: "pending"
        },
        {
            id: 3,
            issue: "Renewable Integration Gap",
            zone: "Residential South",
            severity: "Low",
            description: "Residential South requires increased renewable integration for peak efficiency",
            aiAction: "Increase Wind B turbine output by 80MW and optimize solar distribution to Residential South",
            currentMetrics: {
                gridBalance: 92.1,
                storage: 68.5,
                efficiency: 87.3
            },
            projectedMetrics: {
                gridBalance: 94.1,
                storage: 68.5,
                efficiency: 89.8
            },
            confidenceScore: 91.5,
            coordinates: {
                x: 75,
                y: 30
            },
            status: "pending"
        }
    ]);
    // Simulate real-time data updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIOptimizer.useEffect": ()=>{
            const interval = setInterval({
                "AIOptimizer.useEffect.interval": ()=>{
                    setGridData({
                        "AIOptimizer.useEffect.interval": (prev)=>({
                                ...prev,
                                currentLoad: prev.currentLoad + (Math.random() - 0.5) * 20,
                                efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 2)),
                                gridBalance: Math.max(85, Math.min(98, prev.gridBalance + (Math.random() - 0.5) * 1.5)),
                                storageLevel: Math.max(40, Math.min(85, prev.storageLevel + (Math.random() - 0.5) * 3)),
                                lastUpdated: new Date()
                            })
                    }["AIOptimizer.useEffect.interval"]);
                }
            }["AIOptimizer.useEffect.interval"], 3000);
            return ({
                "AIOptimizer.useEffect": ()=>clearInterval(interval)
            })["AIOptimizer.useEffect"];
        }
    }["AIOptimizer.useEffect"], []);
    const handleOptimize = async ()=>{
        setIsOptimizing(true);
        // Simulate optimization process
        await new Promise((resolve)=>setTimeout(resolve, 3000));
        // Apply optimizations
        setGridData((prev)=>({
                ...prev,
                efficiency: 94.2,
                gridBalance: 96.8,
                storageLevel: 58.3,
                carbonReduction: 18.7
            }));
        setRecommendations((prev)=>prev.map((rec)=>({
                    ...rec,
                    status: 'applied'
                })));
        setIsOptimizing(false);
        setOptimizationComplete(true);
    };
    const handleRecommendationAction = (id, action)=>{
        setRecommendations((prev)=>prev.map((rec)=>rec.id === id ? {
                    ...rec,
                    status: action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'modified'
                } : rec));
    };
    const handleAlertClick = (rec)=>{
        setSelectedAlert(rec);
        setSelectedRecommendation(rec.id);
        // Create the full-screen centered overlay similar to dashboard nodes
        const container = document.querySelector('.max-w-7xl');
        if (container) {
            // Remove any existing overlay
            const existingOverlay = document.querySelector('.alert-center-overlay');
            if (existingOverlay) {
                existingOverlay.remove();
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
            // Create the full-screen centered overlay
            const overlay = document.createElement('div');
            overlay.className = 'alert-center-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm';
            overlay.style.opacity = '0';
            overlay.style.transform = 'scale(0.95)';
            overlay.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            // Prevent scroll events on the overlay
            overlay.addEventListener('wheel', (e)=>e.preventDefault(), {
                passive: false
            });
            overlay.addEventListener('touchmove', (e)=>e.preventDefault(), {
                passive: false
            });
            // Build the overlay content
            const overlayContent = '\n        <div class="bg-slate-900/95 backdrop-blur-xl border border-red-400/30 rounded-2xl p-6 max-w-3xl w-full mx-4 shadow-2xl shadow-red-400/20" style="transform: scale(0.9); opacity: 0; transition: transform 0.5s ease, opacity 0.5s ease;">\n          <!-- Header -->\n          <div class="flex items-center justify-between mb-6">\n            <div class="flex items-center gap-3">\n              <div class="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>\n              <span class="text-lg font-bold text-white">Alert Information</span>\n            </div>\n            <button class="close-overlay w-8 h-8 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-105">\n              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>\n              </svg>\n            </button>\n          </div>\n          \n          <!-- Main Content Grid -->\n          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">\n            <!-- Left Side - Alert Visualization -->\n            <div class="flex flex-col items-center justify-center p-4">\n              <div class="relative">\n                <!-- Main Alert Circle with Animation -->\n                <div class="relative w-16 h-16">\n                  <div class="absolute inset-0 bg-gradient-to-br '.concat(rec.severity === 'High' ? 'from-red-400 to-red-600' : rec.severity === 'Medium' ? 'from-yellow-400 to-yellow-600' : 'from-orange-400 to-orange-600', ' rounded-full animate-pulse shadow-2xl" style="box-shadow: 0 0 40px ').concat(rec.severity === 'High' ? '#ef444440' : rec.severity === 'Medium' ? '#eab30840' : '#f9731640', '"></div>\n                  <div class="absolute inset-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center text-white">\n                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">\n                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />\n                    </svg>\n                  </div>\n                  \n                  <!-- Rotating Rings -->\n                  <div class="absolute -inset-3 border-2 border-red-400/30 rounded-full" style="animation: spin 20s linear infinite;"></div>\n                  <div class="absolute -inset-4 border border-red-400/20 rounded-full" style="animation: spin 30s linear infinite reverse;"></div>\n                </div>\n                \n                <!-- Floating Data Points -->\n                <div class="absolute -top-2 -right-2 w-2 h-2 bg-red-400 rounded-full" style="animation: bounce 2s infinite 0.5s;"></div>\n                <div class="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full" style="animation: bounce 2s infinite 1s;"></div>\n              </div>\n              \n              <!-- Alert Title -->\n              <div class="mt-6 text-center">\n                <h2 class="text-xl font-bold text-white mb-1">').concat(rec.issue, '</h2>\n                <p class="text-md text-gray-400">').concat(rec.zone, '</p>\n                <p class="text-sm text-gray-500 mt-2 max-w-xs">').concat(rec.description, '</p>\n                <div class="mt-3">\n                  <span class="px-2 py-1 rounded text-xs font-medium ').concat(rec.severity === 'High' ? 'bg-red-500/20 text-red-400' : rec.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-orange-500/20 text-orange-400', '">').concat(rec.severity, ' Priority</span>\n                </div>\n              </div>\n            </div>\n            \n            <!-- Right Side - Information Panel -->\n            <div>\n              <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">\n                <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>\n                AI Recommendation\n              </h3>\n              \n              <!-- AI Action -->\n              <div class="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/20 mb-4">\n                <div class="text-xs text-cyan-400 font-medium mb-1">Suggested Action</div>\n                <div class="text-sm text-white">').concat(rec.aiAction, '</div>\n              </div>\n              \n              <!-- Impact Metrics -->\n              <div class="grid grid-cols-1 gap-3 mb-4">\n                <div class="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">\n                  <div class="flex items-center justify-between mb-1">\n                    <span class="text-xs text-gray-400">Grid Balance Impact</span>\n                    <span class="text-sm font-bold text-green-400">+').concat((rec.projectedMetrics.gridBalance - rec.currentMetrics.gridBalance).toFixed(1), '%</span>\n                  </div>\n                  <div class="flex items-center space-x-2 text-xs">\n                    <span class="text-red-400">').concat(rec.currentMetrics.gridBalance, '%</span>\n                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />\n                    </svg>\n                    <span class="text-green-400">').concat(rec.projectedMetrics.gridBalance, '%</span>\n                  </div>\n                </div>\n                \n                <div class="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">\n                  <div class="flex items-center justify-between mb-1">\n                    <span class="text-xs text-gray-400">Efficiency Improvement</span>\n                    <span class="text-sm font-bold text-green-400">+').concat((rec.projectedMetrics.efficiency - rec.currentMetrics.efficiency).toFixed(1), '%</span>\n                  </div>\n                  <div class="flex items-center space-x-2 text-xs">\n                    <span class="text-red-400">').concat(rec.currentMetrics.efficiency, '%</span>\n                    <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />\n                    </svg>\n                    <span class="text-green-400">').concat(rec.projectedMetrics.efficiency, '%</span>\n                  </div>\n                </div>\n              </div>\n              \n              <!-- Confidence Score -->\n              <div class="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20 mb-4">\n                <div class="text-center">\n                  <div class="text-xs text-gray-400 mb-1">AI Confidence Score</div>\n                  <div class="text-xl font-bold text-purple-400 mb-2">').concat(rec.confidenceScore, '%</div>\n                  <div class="w-full bg-gray-800 rounded-full h-2">\n                    <div class="bg-purple-400 h-2 rounded-full transition-all duration-1000" style="width: ').concat(rec.confidenceScore, '%"></div>\n                  </div>\n                </div>\n              </div>\n              \n              <!-- Action Buttons -->\n              <div class="grid grid-cols-2 gap-2">\n                <button class="apply-optimization px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold text-sm rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">\n                  Apply\n                </button>\n                <button class="dismiss-alert px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium text-sm rounded-lg transition-all duration-200">\n                  Dismiss\n                </button>\n              </div>\n            </div>\n          </div>\n        </div>\n      ');
            overlay.innerHTML = overlayContent;
            document.body.appendChild(overlay);
            // Trigger animations
            requestAnimationFrame(()=>{
                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1)';
                const content = overlay.querySelector('.bg-slate-900\\/95');
                if (content) {
                    requestAnimationFrame(()=>{
                        content.style.transform = 'scale(1)';
                        content.style.opacity = '1';
                    });
                }
            });
            // Add close functionality
            const closeBtn = overlay.querySelector('.close-overlay');
            const applyBtn = overlay.querySelector('.apply-optimization');
            const dismissBtn = overlay.querySelector('.dismiss-alert');
            const closeOverlay = ()=>{
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                overlay.style.opacity = '0';
                overlay.style.transform = 'scale(0.95)';
                setTimeout(()=>{
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                        setSelectedAlert(null);
                        setSelectedRecommendation(null);
                    }
                }, 300);
            };
            const applyOptimization = async ()=>{
                const button = applyBtn;
                if (button) {
                    button.innerHTML = '\n            <div class="flex items-center justify-center space-x-2">\n              <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />\n              </svg>\n              <span>Optimizing...</span>\n            </div>\n          ';
                    button.disabled = true;
                    // Simulate optimization
                    await new Promise((resolve)=>setTimeout(resolve, 2000));
                    // Apply optimization
                    setRecommendations((prev)=>prev.map((r)=>r.id === rec.id ? {
                                ...r,
                                status: 'accepted'
                            } : r));
                    setGridData((prev)=>({
                            ...prev,
                            efficiency: prev.efficiency + 2.1,
                            gridBalance: prev.gridBalance + 1.8,
                            storageLevel: rec.projectedMetrics.storage
                        }));
                    closeOverlay();
                }
            };
            closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener('click', closeOverlay);
            applyBtn === null || applyBtn === void 0 ? void 0 : applyBtn.addEventListener('click', applyOptimization);
            dismissBtn === null || dismissBtn === void 0 ? void 0 : dismissBtn.addEventListener('click', closeOverlay);
            overlay === null || overlay === void 0 ? void 0 : overlay.addEventListener('click', (e)=>{
                if (e.target === overlay) closeOverlay();
            });
            // Close on Escape key
            const handleEscape = (e)=>{
                if (e.key === 'Escape') {
                    closeOverlay();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        }
    };
    const handleAlertOptimization = async ()=>{
        if (!selectedAlert) return;
        setIsOptimizing(true);
        // Simulate optimization process with zoom effect
        await new Promise((resolve)=>setTimeout(resolve, 2000));
        // Apply the specific optimization for this alert
        setRecommendations((prev)=>prev.map((rec)=>rec.id === selectedAlert.id ? {
                    ...rec,
                    status: 'accepted'
                } : rec));
        // Update grid data based on the optimization
        setGridData((prev)=>({
                ...prev,
                efficiency: prev.efficiency + 2.1,
                gridBalance: prev.gridBalance + 1.8,
                storageLevel: selectedAlert.projectedMetrics.storage
            }));
        setIsOptimizing(false);
        setShowAlertOptimization(false);
        setSelectedAlert(null);
        setSelectedRecommendation(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
                            children: "AI Optimizer"
                        }, void 0, false, {
                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                            lineNumber: 525,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400",
                        children: "Intelligent grid optimization using reinforcement learning algorithms"
                    }, void 0, false, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/demo/AIOptimizer.tsx",
                lineNumber: 523,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 537,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-400",
                                                children: "Current Load"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 538,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 536,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-bold text-cyan-400",
                                        children: [
                                            gridData.currentLoad.toFixed(0),
                                            " MW"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 540,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500",
                                children: [
                                    "Updated ",
                                    gridData.lastUpdated.toLocaleTimeString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 542,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 534,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 548,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-400",
                                                children: "Grid Balance"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 549,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 547,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-bold text-emerald-400",
                                        children: [
                                            gridData.gridBalance.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 551,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-gray-800 rounded-full h-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-emerald-400 h-2 rounded-full transition-all duration-1000",
                                    style: {
                                        width: "".concat(gridData.gridBalance, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                    lineNumber: 554,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 553,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 545,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 561,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-400",
                                                children: "Storage Level"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 562,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 560,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-bold text-blue-400",
                                        children: [
                                            gridData.storageLevel.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 564,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 559,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-gray-800 rounded-full h-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-400 h-2 rounded-full transition-all duration-1000",
                                    style: {
                                        width: "".concat(gridData.storageLevel, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 566,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 574,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-400",
                                                children: "Efficiency"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 575,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 573,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg font-bold text-orange-400",
                                        children: [
                                            gridData.efficiency.toFixed(1),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 577,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 572,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-gray-800 rounded-full h-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-orange-400 h-2 rounded-full transition-all duration-1000",
                                    style: {
                                        width: "".concat(gridData.efficiency, "%")
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                    lineNumber: 580,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 571,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/demo/AIOptimizer.tsx",
                lineNumber: 533,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-3 gap-8 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "energy-network-card",
                        className: "lg:col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 energy-network-map",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-white mb-2",
                                        children: "Energy Network Graph"
                                    }, void 0, false, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 590,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400",
                                        children: "Interactive energy flow visualization with AI recommendations"
                                    }, void 0, false, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 591,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 589,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg p-6 border border-white/10 h-80 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-80"
                                    }, void 0, false, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 596,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0",
                                        style: {
                                            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                                            backgroundSize: '20px 20px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 597,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-full h-full absolute inset-0 z-10",
                                        viewBox: "0 0 1200 600",
                                        style: {
                                            transformOrigin: '0 0',
                                            transform: 'translateZ(0)',
                                            backfaceVisibility: 'hidden'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                                children: "\n                  @keyframes highlightPulse {\n                    0% { opacity: 1; stroke-width: 12; }\n                    25% { opacity: 0.8; stroke-width: 14; }\n                    50% { opacity: 1; stroke-width: 16; }\n                    75% { opacity: 0.8; stroke-width: 14; }\n                    100% { opacity: 1; stroke-width: 12; }\n                  }\n                  .highlight-connection {\n                    animation: highlightPulse 1s infinite;\n                    stroke: #00ff00 !important;\n                    filter: drop-shadow(0 0 20px #00ff00) drop-shadow(0 0 40px #00ff00);\n                  }\n                "
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 612,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                        id: "centralNode",
                                                        cx: "50%",
                                                        cy: "50%",
                                                        r: "50%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0%",
                                                                stopColor: "#fbbf24",
                                                                stopOpacity: "0.9"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 632,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "70%",
                                                                stopColor: "#f59e0b",
                                                                stopOpacity: "0.7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 633,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "100%",
                                                                stopColor: "#d97706",
                                                                stopOpacity: "0.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 634,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 631,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                        id: "primaryNode",
                                                        cx: "50%",
                                                        cy: "50%",
                                                        r: "50%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0%",
                                                                stopColor: "#22d3ee",
                                                                stopOpacity: "0.8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 638,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "70%",
                                                                stopColor: "#0891b2",
                                                                stopOpacity: "0.6"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 639,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "100%",
                                                                stopColor: "#0e7490",
                                                                stopOpacity: "0.4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 640,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 637,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                        id: "secondaryNode",
                                                        cx: "50%",
                                                        cy: "50%",
                                                        r: "50%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0%",
                                                                stopColor: "#10b981",
                                                                stopOpacity: "0.8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 644,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "70%",
                                                                stopColor: "#059669",
                                                                stopOpacity: "0.6"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 645,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "100%",
                                                                stopColor: "#047857",
                                                                stopOpacity: "0.4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 646,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 643,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                                                        id: "criticalNode",
                                                        cx: "50%",
                                                        cy: "50%",
                                                        r: "50%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "0%",
                                                                stopColor: "#ef4444",
                                                                stopOpacity: "0.8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 650,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "70%",
                                                                stopColor: "#dc2626",
                                                                stopOpacity: "0.6"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 651,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                offset: "100%",
                                                                stopColor: "#b91c1c",
                                                                stopOpacity: "0.4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 652,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                        id: "nodeGlow",
                                                        x: "-50%",
                                                        y: "-50%",
                                                        width: "200%",
                                                        height: "200%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "4",
                                                                result: "coloredBlur"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "coloredBlur"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 659,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "SourceGraphic"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 660,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 658,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                        id: "connectionGlow",
                                                        x: "-50%",
                                                        y: "-50%",
                                                        width: "200%",
                                                        height: "200%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "2",
                                                                result: "coloredBlur"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "coloredBlur"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 667,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "SourceGraphic"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 668,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 666,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                        id: "highlightGlow",
                                                        x: "-100%",
                                                        y: "-100%",
                                                        width: "300%",
                                                        height: "300%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "12",
                                                                result: "coloredBlur"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 673,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                                in: "coloredBlur",
                                                                type: "matrix",
                                                                values: "0 1 0 0 0.2   0 1 0 0 1   0 1 0 0 0.2   0 0 0 1 0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 674,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "6",
                                                                result: "innerGlow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 675,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                                in: "innerGlow",
                                                                type: "matrix",
                                                                values: "0 1 0 0 0.5   0 1 0 0 1   0 1 0 0 0.5   0 0 0 1 0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "coloredBlur"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "innerGlow"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 679,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "SourceGraphic"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 680,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 677,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 672,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                        id: "nodeHighlight",
                                                        x: "-200%",
                                                        y: "-200%",
                                                        width: "500%",
                                                        height: "500%",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "15",
                                                                result: "outerGlow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 685,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                                in: "outerGlow",
                                                                type: "matrix",
                                                                values: "0 1 0 0 0.3   0 1 0 0 1   0 1 0 0 0.3   0 0 0 1 0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 686,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "8",
                                                                result: "innerGlow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 687,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                                in: "innerGlow",
                                                                type: "matrix",
                                                                values: "0 1 0 0 0.5   0 1 0 0 1   0 1 0 0 0.5   0 0 0 1 0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 688,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                stdDeviation: "3",
                                                                result: "coreGlow"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 689,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                                                in: "coreGlow",
                                                                type: "matrix",
                                                                values: "0 1 0 0 1   0 1 0 0 1   0 1 0 0 1   0 0 0 1 0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 690,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "outerGlow"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 692,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "innerGlow"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "coreGlow"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 694,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "SourceGraphic"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 695,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 691,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 684,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 629,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                id: "connections",
                                                opacity: "0.6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 300 150",
                                                        stroke: getConnectionStyle("Central Grid", "Residential North").stroke || "#22d3ee",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Residential North").strokeWidth || "3",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Residential North").opacity || "0.7",
                                                        filter: getConnectionStyle("Central Grid", "Residential North").filter || "url(#connectionGlow)",
                                                        className: highlightedNode === "Residential North" || highlightedNode === "Central Grid" ? "highlight-connection" : "",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.4;0.8;0.4",
                                                            dur: "3s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 712,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 703,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 900 150",
                                                        stroke: getConnectionStyle("Central Grid", "Residential South").stroke || "#22d3ee",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Residential South").strokeWidth || "3",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Residential South").opacity || "0.7",
                                                        filter: getConnectionStyle("Central Grid", "Residential South").filter || "url(#connectionGlow)",
                                                        className: highlightedNode === "Residential South" || highlightedNode === "Central Grid" ? "highlight-connection" : "",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.8;0.4;0.8",
                                                            dur: "3s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 723,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 714,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 200 450",
                                                        stroke: getConnectionStyle("Central Grid", "Commercial West").stroke || "#10b981",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Commercial West").strokeWidth || "3",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Commercial West").opacity || "0.7",
                                                        filter: getConnectionStyle("Central Grid", "Commercial West").filter || "url(#connectionGlow)",
                                                        className: highlightedNode === "Commercial West" || highlightedNode === "Central Grid" ? "highlight-connection" : "",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.6;0.9;0.6",
                                                            dur: "2.5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 734,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 1000 450",
                                                        stroke: getConnectionStyle("Central Grid", "Industrial East").stroke || "#10b981",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Industrial East").strokeWidth || "3",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Industrial East").opacity || "0.7",
                                                        filter: getConnectionStyle("Central Grid", "Industrial East").filter || "url(#connectionGlow)",
                                                        className: highlightedNode === "Industrial East" || highlightedNode === "Central Grid" ? "highlight-connection" : "",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.9;0.6;0.9",
                                                            dur: "2.5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 745,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 736,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 600 100",
                                                        stroke: getConnectionStyle("Central Grid", "Critical Systems").stroke || "#ef4444",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Critical Systems").strokeWidth || "4",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Critical Systems").opacity || "0.8",
                                                        filter: getConnectionStyle("Central Grid", "Critical Systems").filter || "url(#connectionGlow)",
                                                        className: highlightedNode === "Critical Systems" || highlightedNode === "Central Grid" ? "highlight-connection" : "",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.5;1;0.5",
                                                            dur: "2s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 756,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 747,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 150 80",
                                                        stroke: getConnectionStyle("Central Grid", "Solar A").stroke || "#8b5cf6",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Solar A").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Solar A").opacity || "0.3",
                                                        filter: getConnectionStyle("Central Grid", "Solar A").filter || "url(#connectionGlow)",
                                                        strokeDasharray: getConnectionStyle("Central Grid", "Solar A").strokeDasharray || "3,3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.2;0.5;0.2",
                                                            dur: "4s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 769,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 760,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 1050 80",
                                                        stroke: getConnectionStyle("Central Grid", "Wind B").stroke || "#8b5cf6",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Wind B").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Wind B").opacity || "0.3",
                                                        filter: getConnectionStyle("Central Grid", "Wind B").filter || "url(#connectionGlow)",
                                                        strokeDasharray: getConnectionStyle("Central Grid", "Wind B").strokeDasharray || "3,3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.5;0.2;0.5",
                                                            dur: "4s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 780,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 771,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 50 520",
                                                        stroke: getConnectionStyle("Central Grid", "Storage West").stroke || "#f59e0b",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Storage West").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Storage West").opacity || "0.3",
                                                        filter: getConnectionStyle("Central Grid", "Storage West").filter || "url(#connectionGlow)",
                                                        strokeDasharray: getConnectionStyle("Central Grid", "Storage West").strokeDasharray || "3,3",
                                                        className: highlightedNode === "Storage West" || highlightedNode === "Central Grid" ? "highlight-connection" : "",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.2;0.6;0.2",
                                                            dur: "5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 792,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 600 300 L 1150 520",
                                                        stroke: getConnectionStyle("Central Grid", "Storage East").stroke || "#f59e0b",
                                                        strokeWidth: getConnectionStyle("Central Grid", "Storage East").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Central Grid", "Storage East").opacity || "0.3",
                                                        filter: getConnectionStyle("Central Grid", "Storage East").filter || "url(#connectionGlow)",
                                                        strokeDasharray: getConnectionStyle("Central Grid", "Storage East").strokeDasharray || "3,3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.6;0.2;0.6",
                                                            dur: "5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 803,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 794,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 300 150 L 900 150",
                                                        stroke: "#64748b",
                                                        strokeWidth: "2",
                                                        fill: "none",
                                                        opacity: "0.4",
                                                        strokeDasharray: "5,5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "stroke-dashoffset",
                                                            values: "0;-10",
                                                            dur: "4s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 807,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 200 450 L 1000 450",
                                                        stroke: "#64748b",
                                                        strokeWidth: "2",
                                                        fill: "none",
                                                        opacity: "0.4",
                                                        strokeDasharray: "5,5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "stroke-dashoffset",
                                                            values: "0;-10",
                                                            dur: "4s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 811,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 300 150 L 200 450",
                                                        stroke: "#64748b",
                                                        strokeWidth: "1.5",
                                                        fill: "none",
                                                        opacity: "0.3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.2;0.5;0.2",
                                                            dur: "5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 814,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 813,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 900 150 L 1000 450",
                                                        stroke: "#64748b",
                                                        strokeWidth: "1.5",
                                                        fill: "none",
                                                        opacity: "0.3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.5;0.2;0.5",
                                                            dur: "5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 817,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 816,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 300 150 L 150 80",
                                                        stroke: getConnectionStyle("Residential North", "Solar A").stroke || "#8b5cf6",
                                                        strokeWidth: getConnectionStyle("Residential North", "Solar A").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Residential North", "Solar A").opacity || "0.5",
                                                        filter: getConnectionStyle("Residential North", "Solar A").filter || "url(#connectionGlow)",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.3;0.7;0.3",
                                                            dur: "3.5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 829,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 821,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 900 150 L 1050 80",
                                                        stroke: getConnectionStyle("Residential South", "Wind B").stroke || "#8b5cf6",
                                                        strokeWidth: getConnectionStyle("Residential South", "Wind B").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Residential South", "Wind B").opacity || "0.5",
                                                        filter: getConnectionStyle("Residential South", "Wind B").filter || "url(#connectionGlow)",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.7;0.3;0.7",
                                                            dur: "3.5s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 839,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 831,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 200 450 L 50 520",
                                                        stroke: getConnectionStyle("Commercial West", "Storage West").stroke || "#f59e0b",
                                                        strokeWidth: getConnectionStyle("Commercial West", "Storage West").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Commercial West", "Storage West").opacity || "0.5",
                                                        filter: getConnectionStyle("Commercial West", "Storage West").filter || "url(#connectionGlow)",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.4;0.8;0.4",
                                                            dur: "4s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 849,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 841,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M 1000 450 L 1150 520",
                                                        stroke: getConnectionStyle("Industrial East", "Storage East").stroke || "#f59e0b",
                                                        strokeWidth: getConnectionStyle("Industrial East", "Storage East").strokeWidth || "2",
                                                        fill: "none",
                                                        opacity: getConnectionStyle("Industrial East", "Storage East").opacity || "0.5",
                                                        filter: getConnectionStyle("Industrial East", "Storage East").filter || "url(#connectionGlow)",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                            attributeName: "opacity",
                                                            values: "0.8;0.4;0.8",
                                                            dur: "4s",
                                                            repeatCount: "indefinite"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 859,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 851,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 701,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                id: "dataFlow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        r: "3",
                                                        fill: "#22d3ee",
                                                        opacity: "0.8",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                                                            dur: "6s",
                                                            repeatCount: "indefinite",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                                                                href: "#dataPath1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 867,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 866,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 865,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        r: "2",
                                                        fill: "#10b981",
                                                        opacity: "0.7",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animateMotion", {
                                                            dur: "4s",
                                                            repeatCount: "indefinite",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mpath", {
                                                                href: "#dataPath2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 872,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 871,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        id: "dataPath1",
                                                        d: "M 600 300 L 300 150 L 900 150 L 600 300",
                                                        fill: "none",
                                                        opacity: "0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 875,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        id: "dataPath2",
                                                        d: "M 600 300 L 200 450 L 1000 450 L 600 300",
                                                        fill: "none",
                                                        opacity: "0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 876,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 864,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                id: "nodes",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "600",
                                                                cy: "300",
                                                                r: "35",
                                                                fill: "url(#centralNode)",
                                                                filter: getNodeStyle("Central Grid").filter || "url(#nodeGlow)",
                                                                stroke: getNodeStyle("Central Grid").stroke || "#fbbf24",
                                                                strokeWidth: getNodeStyle("Central Grid").strokeWidth || "0",
                                                                className: "group-hover:r-40 transition-all duration-200 drop-shadow-lg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 883,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "600",
                                                                cy: "300",
                                                                r: "25",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Central Grid").stroke || "#fbbf24",
                                                                strokeWidth: getNodeStyle("Central Grid").strokeWidth || "2",
                                                                opacity: "0.8",
                                                                className: "group-hover:stroke-width-3 transition-all duration-200"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 893,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "600",
                                                                y: "250",
                                                                textAnchor: "middle",
                                                                className: "text-sm font-bold drop-shadow transition-colors duration-200 fill-yellow-300 group-hover:fill-yellow-200",
                                                                children: "Power Hub"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 903,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "600",
                                                                y: "266",
                                                                textAnchor: "middle",
                                                                className: "fill-yellow-400 text-xs font-semibold",
                                                                children: "Central Grid"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 904,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "600",
                                                                y: "340",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-200 fill-gray-300 group-hover:fill-white",
                                                                children: "2,847 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 905,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "600",
                                                                y: "355",
                                                                textAnchor: "middle",
                                                                className: "fill-gray-400 text-xs",
                                                                children: "Active"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 906,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 882,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "300",
                                                                cy: "150",
                                                                r: "25",
                                                                fill: "url(#primaryNode)",
                                                                filter: getNodeStyle("Residential North").filter || "url(#nodeGlow)",
                                                                stroke: getNodeStyle("Residential North").stroke || "#10b981",
                                                                strokeWidth: getNodeStyle("Residential North").strokeWidth || "1.5",
                                                                className: "group-hover:r-30 transition-all duration-200 drop-shadow-lg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 911,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "300",
                                                                cy: "150",
                                                                r: "18",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Residential North").stroke || "#10b981",
                                                                strokeWidth: "2",
                                                                opacity: "0.6",
                                                                className: "group-hover:stroke-width-3 group-hover:opacity-80 transition-all duration-200"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 921,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "300",
                                                                y: "125",
                                                                textAnchor: "middle",
                                                                className: "text-xs font-bold transition-colors duration-200 fill-cyan-300 group-hover:fill-cyan-200",
                                                                children: "Residential N"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 931,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "300",
                                                                y: "180",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-200 fill-gray-300 group-hover:fill-white",
                                                                children: "820 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 932,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 910,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "900",
                                                                cy: "150",
                                                                r: "25",
                                                                fill: "url(#primaryNode)",
                                                                filter: getNodeStyle("Residential South").filter || "url(#nodeGlow)",
                                                                stroke: getNodeStyle("Residential South").stroke || "#10b981",
                                                                strokeWidth: getNodeStyle("Residential South").strokeWidth || "1.5",
                                                                className: "group-hover:r-30 transition-all duration-300 drop-shadow-lg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 936,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "900",
                                                                cy: "150",
                                                                r: "18",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Residential South").stroke || "#10b981",
                                                                strokeWidth: "2",
                                                                opacity: "0.6",
                                                                className: "group-hover:stroke-width-3 group-hover:opacity-80 transition-all duration-300"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 946,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "900",
                                                                y: "115",
                                                                textAnchor: "middle",
                                                                className: "text-sm font-semibold transition-colors duration-300 fill-cyan-300 group-hover:fill-cyan-200",
                                                                children: "Residential South"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 956,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "900",
                                                                y: "185",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-300 fill-gray-300 group-hover:fill-white",
                                                                children: "950 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 957,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 935,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "200",
                                                                cy: "450",
                                                                r: "25",
                                                                fill: "url(#secondaryNode)",
                                                                filter: getNodeStyle("Commercial West").filter || "url(#nodeGlow)",
                                                                className: "group-hover:r-30 transition-all duration-300 drop-shadow-lg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 961,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "200",
                                                                cy: "450",
                                                                r: "18",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Commercial West").stroke || "#10b981",
                                                                strokeWidth: getNodeStyle("Commercial West").strokeWidth || "1.5",
                                                                opacity: "0.6",
                                                                className: "group-hover:stroke-width-2 group-hover:opacity-80 transition-all duration-300"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 964,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "200",
                                                                y: "415",
                                                                textAnchor: "middle",
                                                                className: "text-sm font-semibold transition-colors duration-300 fill-emerald-300 group-hover:fill-emerald-200",
                                                                children: "Commercial West"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 969,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "200",
                                                                y: "485",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-300 fill-gray-300 group-hover:fill-white",
                                                                children: "650 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 970,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 960,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "1000",
                                                                cy: "450",
                                                                r: "25",
                                                                fill: "url(#secondaryNode)",
                                                                filter: getNodeStyle("Industrial East").filter || "url(#nodeGlow)",
                                                                className: "group-hover:r-30 transition-all duration-300 drop-shadow-lg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 974,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "1000",
                                                                cy: "450",
                                                                r: "18",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Industrial East").stroke || "#10b981",
                                                                strokeWidth: getNodeStyle("Industrial East").strokeWidth || "1.5",
                                                                opacity: "0.6",
                                                                className: "group-hover:stroke-width-2 group-hover:opacity-80 transition-all duration-300"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 977,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "1000",
                                                                y: "415",
                                                                textAnchor: "middle",
                                                                className: "text-sm font-semibold transition-colors duration-300 fill-emerald-300 group-hover:fill-emerald-200",
                                                                children: "Industrial East"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 982,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "1000",
                                                                y: "485",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-300 fill-gray-300 group-hover:fill-white",
                                                                children: "980 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 983,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "600",
                                                                cy: "100",
                                                                r: "22",
                                                                fill: "url(#criticalNode)",
                                                                filter: getNodeStyle("Critical Systems").filter || "url(#nodeGlow)",
                                                                className: "group-hover:r-27 transition-all duration-300 drop-shadow-lg"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 988,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "600",
                                                                cy: "100",
                                                                r: "15",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Critical Systems").stroke || "#ef4444",
                                                                strokeWidth: getNodeStyle("Critical Systems").strokeWidth || "2",
                                                                opacity: "0.8",
                                                                className: "group-hover:stroke-width-3 transition-all duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                    attributeName: "opacity",
                                                                    values: "0.5;1;0.5",
                                                                    dur: "1.5s",
                                                                    repeatCount: "indefinite"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                    lineNumber: 996,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 991,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "600",
                                                                cy: "100",
                                                                r: "30",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Critical Systems").stroke || "#ef4444",
                                                                strokeWidth: "1",
                                                                opacity: "0.3",
                                                                className: "group-hover:opacity-50 transition-opacity duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                    attributeName: "r",
                                                                    values: "30;35;30",
                                                                    dur: "2s",
                                                                    repeatCount: "indefinite"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                    lineNumber: 1002,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 998,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "600",
                                                                y: "70",
                                                                textAnchor: "middle",
                                                                className: "text-sm font-semibold transition-colors duration-300 fill-red-300 group-hover:fill-red-200",
                                                                children: "Critical Systems"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1004,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "600",
                                                                y: "130",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-300 fill-gray-300 group-hover:fill-white",
                                                                children: "200 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1005,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 987,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "150",
                                                                cy: "80",
                                                                r: "15",
                                                                fill: "#8b5cf6",
                                                                filter: getNodeStyle("Solar A").filter || "url(#nodeGlow)",
                                                                className: "group-hover:r-18 transition-all duration-300 drop-shadow-md"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1010,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "150",
                                                                cy: "80",
                                                                r: "20",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Solar A").stroke || "#8b5cf6",
                                                                strokeWidth: "0.5",
                                                                opacity: "0.3",
                                                                className: "group-hover:opacity-50 transition-opacity duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                    attributeName: "r",
                                                                    values: "20;25;20",
                                                                    dur: "3s",
                                                                    repeatCount: "indefinite"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                    lineNumber: 1017,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1013,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "150",
                                                                y: "55",
                                                                textAnchor: "middle",
                                                                className: "text-xs font-medium transition-colors duration-300 fill-purple-300 group-hover:fill-purple-200",
                                                                children: "Solar A"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1019,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "150",
                                                                y: "105",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-300 fill-gray-400 group-hover:fill-gray-300",
                                                                children: "450 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1020,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1009,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "1050",
                                                                cy: "80",
                                                                r: "15",
                                                                fill: "#8b5cf6",
                                                                filter: getNodeStyle("Wind B").filter || "url(#nodeGlow)",
                                                                className: "group-hover:r-18 transition-all duration-300 drop-shadow-md"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1024,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "1050",
                                                                cy: "80",
                                                                r: "20",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Wind B").stroke || "#8b5cf6",
                                                                strokeWidth: "0.5",
                                                                opacity: "0.3",
                                                                className: "group-hover:opacity-50 transition-opacity duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                    attributeName: "r",
                                                                    values: "20;25;20",
                                                                    dur: "3s",
                                                                    repeatCount: "indefinite"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                    lineNumber: 1031,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1027,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "1050",
                                                                y: "55",
                                                                textAnchor: "middle",
                                                                className: "text-xs font-medium transition-colors duration-300 fill-purple-300 group-hover:fill-purple-200",
                                                                children: "Wind B"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1033,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "1050",
                                                                y: "105",
                                                                textAnchor: "middle",
                                                                className: "text-xs transition-colors duration-300 fill-gray-400 group-hover:fill-gray-300",
                                                                children: "680 MW"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1034,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1023,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "50",
                                                                cy: "520",
                                                                r: "12",
                                                                fill: "#f59e0b",
                                                                filter: getNodeStyle("Storage West").filter || "url(#nodeGlow)",
                                                                className: "group-hover:r-15 transition-all duration-300 drop-shadow-md"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1038,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "50",
                                                                cy: "520",
                                                                r: "16",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Storage West").stroke || "#f59e0b",
                                                                strokeWidth: "0.5",
                                                                opacity: "0.3",
                                                                className: "group-hover:opacity-50 transition-opacity duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                    attributeName: "r",
                                                                    values: "16;20;16",
                                                                    dur: "3s",
                                                                    repeatCount: "indefinite"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                    lineNumber: 1045,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1041,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "50",
                                                                y: "545",
                                                                textAnchor: "middle",
                                                                className: "text-xs font-medium transition-colors duration-300 fill-amber-300 group-hover:fill-amber-200",
                                                                children: "Storage W"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1047,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1037,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                        className: "cursor-pointer group transition-all duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "1150",
                                                                cy: "520",
                                                                r: "12",
                                                                fill: "#f59e0b",
                                                                filter: getNodeStyle("Storage East").filter || "url(#nodeGlow)",
                                                                className: "group-hover:r-15 transition-all duration-300 drop-shadow-md"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1051,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "1150",
                                                                cy: "520",
                                                                r: "16",
                                                                fill: "none",
                                                                stroke: getNodeStyle("Storage East").stroke || "#f59e0b",
                                                                strokeWidth: "0.5",
                                                                opacity: "0.3",
                                                                className: "group-hover:opacity-50 transition-opacity duration-300",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("animate", {
                                                                    attributeName: "r",
                                                                    values: "16;20;16",
                                                                    dur: "3s",
                                                                    repeatCount: "indefinite"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                    lineNumber: 1058,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1054,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                x: "1150",
                                                                y: "545",
                                                                textAnchor: "middle",
                                                                className: "text-xs font-medium transition-colors duration-300 fill-amber-300 group-hover:fill-amber-200",
                                                                children: "Storage E"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1060,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1050,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 880,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 603,
                                        columnNumber: 13
                                    }, this),
                                    recommendations.map((rec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 z-20 ".concat(selectedRecommendation === rec.id ? 'scale-125' : ''),
                                            style: {
                                                left: "".concat(rec.coordinates.x, "%"),
                                                top: "".concat(rec.coordinates.y, "%")
                                            },
                                            onClick: ()=>handleAlertClick(rec),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-6 h-6 rounded-full border-2 ".concat(rec.severity === 'High' ? 'bg-red-500/80 border-red-400' : rec.severity === 'Medium' ? 'bg-yellow-500/80 border-yellow-400' : 'bg-orange-500/80 border-orange-400', " flex items-center justify-center"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3 text-white",
                                                        fill: "currentColor",
                                                        viewBox: "0 0 20 20",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            fillRule: "evenodd",
                                                            d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                                                            clipRule: "evenodd"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 1081,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1080,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 rounded-full animate-ping ".concat(rec.severity === 'High' ? 'bg-red-400' : rec.severity === 'Medium' ? 'bg-yellow-400' : 'bg-orange-400')
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1085,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1076,
                                                columnNumber: 17
                                            }, this)
                                        }, rec.id, false, {
                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                            lineNumber: 1067,
                                            columnNumber: 15
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 594,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-bold text-white mb-2",
                                        children: "Optimization Control"
                                    }, void 0, false, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1099,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400",
                                        children: "AI-powered grid optimization engine"
                                    }, void 0, false, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1100,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 1098,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm font-bold text-purple-400",
                                                                children: "AI Engine Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1107,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-400",
                                                                children: "Neural network processing"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1108,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1106,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1111,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-purple-400",
                                                                children: "Active"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1112,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleOptimize,
                                                disabled: isOptimizing,
                                                className: "w-full px-4 py-3 rounded-lg font-bold transition-all ".concat(isOptimizing ? 'bg-blue-500/30 text-blue-400 cursor-not-allowed' : optimizationComplete ? 'bg-green-500/30 text-green-400' : 'bg-purple-500/30 text-purple-400 hover:bg-purple-500/40 hover:shadow-lg hover:shadow-purple-500/20'),
                                                children: isOptimizing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4 animate-spin",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1130,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 1129,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Optimizing..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 1132,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                    lineNumber: 1128,
                                                    columnNumber: 19
                                                }, this) : optimizationComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M5 13l4 4L19 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1137,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 1136,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Optimization Complete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 1139,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 19
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-center space-x-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1144,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 1143,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Optimize Grid"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                            lineNumber: 1146,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                    lineNumber: 1142,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1104,
                                        columnNumber: 13
                                    }, this),
                                    optimizationComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-green-500/10 border border-green-500/20 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-bold text-green-400 mb-2",
                                                children: "Optimization Results"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1154,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: "Grid Balance:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1157,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-green-400",
                                                                children: "+4.7%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1158,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1156,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: "Efficiency:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1161,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-green-400",
                                                                children: "+6.9%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1162,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1160,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-400",
                                                                children: "Carbon Reduction:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1165,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-green-400",
                                                                children: "+3.5%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1166,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1164,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1155,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1153,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-white/5 rounded-lg border border-white/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-bold text-white mb-2",
                                                children: "Active Recommendations"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1173,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl font-bold text-cyan-400",
                                                children: recommendations.filter((r)=>r.status === 'pending').length
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1174,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-400",
                                                children: "Issues detected"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1175,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1172,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 1103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 1097,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/demo/AIOptimizer.tsx",
                lineNumber: 586,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-white",
                        children: "AI Recommendations"
                    }, void 0, false, {
                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                        lineNumber: 1183,
                        columnNumber: 9
                    }, this),
                    recommendations.map((rec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white/5 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/10 ".concat(glowingCard === rec.id ? 'ring-4 ring-red-400 border-red-400/70 shadow-xl shadow-red-400/30 bg-red-500/10' : 'border-white/10'),
                            onClick: ()=>handleRecommendationClick(rec),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid lg:grid-cols-3 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-3 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-3 h-3 rounded-full ".concat(rec.severity === 'High' ? 'bg-red-400' : rec.severity === 'Medium' ? 'bg-yellow-400' : 'bg-green-400')
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1200,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-bold text-white",
                                                                children: rec.issue
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1204,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1199,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-400 mb-2",
                                                        children: rec.zone
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1206,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-300",
                                                        children: rec.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1207,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1198,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-bold text-cyan-400 mb-1",
                                                        children: "AI Action Suggested"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1211,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-300",
                                                        children: rec.aiAction
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1212,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1210,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                className: "font-bold text-white mb-3",
                                                children: "Projected Impact"
                                            }, void 0, false, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1218,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 bg-white/5 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Grid Balance"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 1222,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-red-400",
                                                                                children: [
                                                                                    rec.currentMetrics.gridBalance,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1224,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "w-4 h-4 text-gray-400",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                viewBox: "0 0 24 24",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    strokeWidth: 2,
                                                                                    d: "M13 7l5 5m0 0l-5 5m5-5H6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                    lineNumber: 1226,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1225,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-green-400",
                                                                                children: [
                                                                                    rec.projectedMetrics.gridBalance,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1228,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 1223,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1221,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-green-400 font-bold",
                                                                children: [
                                                                    "+",
                                                                    (rec.projectedMetrics.gridBalance - rec.currentMetrics.gridBalance).toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1231,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1220,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 bg-white/5 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Storage Level"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 1238,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-red-400",
                                                                                children: [
                                                                                    rec.currentMetrics.storage,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1240,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "w-4 h-4 text-gray-400",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                viewBox: "0 0 24 24",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    strokeWidth: 2,
                                                                                    d: "M13 7l5 5m0 0l-5 5m5-5H6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                    lineNumber: 1242,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1241,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-green-400",
                                                                                children: [
                                                                                    rec.projectedMetrics.storage,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1244,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 1239,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1237,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-bold ".concat(rec.projectedMetrics.storage - rec.currentMetrics.storage > 0 ? 'text-green-400' : 'text-orange-400'),
                                                                children: [
                                                                    rec.projectedMetrics.storage - rec.currentMetrics.storage > 0 ? '+' : '',
                                                                    (rec.projectedMetrics.storage - rec.currentMetrics.storage).toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1247,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1236,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between p-3 bg-white/5 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-sm text-gray-400",
                                                                        children: "Efficiency"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 1257,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center space-x-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-red-400",
                                                                                children: [
                                                                                    rec.currentMetrics.efficiency,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1259,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                className: "w-4 h-4 text-gray-400",
                                                                                fill: "none",
                                                                                stroke: "currentColor",
                                                                                viewBox: "0 0 24 24",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    strokeWidth: 2,
                                                                                    d: "M13 7l5 5m0 0l-5 5m5-5H6"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                    lineNumber: 1261,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1260,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-green-400",
                                                                                children: [
                                                                                    rec.projectedMetrics.efficiency,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                                lineNumber: 1263,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                        lineNumber: 1258,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1256,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-green-400 font-bold",
                                                                children: [
                                                                    "+",
                                                                    (rec.projectedMetrics.efficiency - rec.currentMetrics.efficiency).toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1266,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1255,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1219,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1217,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                        className: "font-bold text-white mb-3",
                                                        children: "Confidence Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1276,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-bold text-purple-400 mb-1",
                                                                children: [
                                                                    rec.confidenceScore,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1278,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-gray-400",
                                                                children: "AI Confidence Level"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1279,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full bg-gray-800 rounded-full h-2 mt-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "bg-purple-400 h-2 rounded-full transition-all duration-1000",
                                                                    style: {
                                                                        width: "".concat(rec.confidenceScore, "%")
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                    lineNumber: 1281,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1280,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1277,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1275,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                        className: "font-bold text-white mb-3",
                                                        children: "Operator Controls"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1290,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleAcceptOptimization(rec),
                                                                disabled: rec.status !== 'pending' || isOptimizing,
                                                                className: "w-full px-4 py-2 rounded-lg font-medium transition-all ".concat(rec.status === 'accepted' ? 'bg-green-500/30 text-green-400 border border-green-500/50' : rec.status === 'pending' ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30' : 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/20'),
                                                                children: isOptimizing && selectedRecommendation === rec.id ? 'Optimizing...' : rec.status === 'accepted' ? '✓ Accepted' : 'Accept & Optimize'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1292,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleRecommendationAction(rec.id, 'reject'),
                                                                disabled: rec.status !== 'pending',
                                                                className: "w-full px-4 py-2 rounded-lg font-medium transition-all ".concat(rec.status === 'rejected' ? 'bg-red-500/30 text-red-400 border border-red-500/50' : rec.status === 'pending' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' : 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/20'),
                                                                children: rec.status === 'rejected' ? '✗ Rejected' : 'Reject'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1306,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleRecommendationAction(rec.id, 'modify'),
                                                                disabled: rec.status !== 'pending',
                                                                className: "w-full px-4 py-2 rounded-lg font-medium transition-all ".concat(rec.status === 'modified' ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50' : rec.status === 'pending' ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30' : 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/20'),
                                                                children: rec.status === 'modified' ? '⚙ Modified' : 'Modify'
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                                lineNumber: 1320,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                        lineNumber: 1291,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                                lineNumber: 1289,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/demo/AIOptimizer.tsx",
                                        lineNumber: 1274,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/demo/AIOptimizer.tsx",
                                lineNumber: 1195,
                                columnNumber: 13
                            }, this)
                        }, rec.id, false, {
                            fileName: "[project]/components/demo/AIOptimizer.tsx",
                            lineNumber: 1186,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/demo/AIOptimizer.tsx",
                lineNumber: 1182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/demo/AIOptimizer.tsx",
        lineNumber: 522,
        columnNumber: 5
    }, this);
}
_s(AIOptimizer, "aauASFs1cV0DpwH7CvmJUpAsMZg=");
_c = AIOptimizer;
var _c;
__turbopack_context__.k.register(_c, "AIOptimizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_demo_AIOptimizer_tsx_7faeaaad._.js.map