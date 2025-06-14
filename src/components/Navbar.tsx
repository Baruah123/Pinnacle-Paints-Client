import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ChevronRight, Download, ShoppingBag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useShop } from '@/contexts/ShopContext';
import useCartAnimation from '@/hooks/use-cart-animation';

const useIsExtraSmall = () => {
  const [isXs, setIsXs] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsXs(window.innerWidth < 480);
    };
    
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);
  
  return isXs;
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{[key: string]: boolean}>({});
  const [mobileSubDropdowns, setMobileSubDropdowns] = useState<{[key: string]: boolean}>({});
  const location = useLocation();
  const isMobile = useIsMobile();
  const isXs = useIsExtraSmall();
  const { dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const lightBackgroundPages = ['/shop'];
  const isLightPage = lightBackgroundPages.includes(location.pathname);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdowns({});
    setMobileSubDropdowns({});
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileDropdowns({});
      setMobileSubDropdowns({});
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Story', href: '/story' },
    { name: 'Collections', href: '/collections' },
    { name: 'Shop', href: '/shop' },
    {
      name: 'Products',
      href: '#',
      dropdown: [
        { name: 'Decorative Paints', href: '/products/decorative-paints' },
        { name: 'Eco-Friendly Paints', href: '/products/eco-friendly-paints' },
        { name: 'Industrial Solutions', href: '/products/industrial-solutions' }
      ]
    },
    {
      name: 'Vendors',
      href: '#',
      dropdown: [
        {
          name: 'Diamond Collection',
          href: '/vendors/diamond-collection',
          hasSubDropdown: true,
          subDropdown: [
            { 
              name: 'Electrical Paints', 
              href: '#',
              description: 'Superior results for professionals and enthusiasts' 
            },
            { 
              name: 'Spray Equipment', 
              href: '#',
              description: 'Premium quality tools for perfect application' 
            },
            { 
              name: 'View Catalog', 
              href: '/Catalog/diamond_paints_catalog.pdf', 
              isDownload: true 
            },
            { 
              name: 'Equipment Catalog', 
              href: '/Catalog/airless_spray_equipment_catalog.pdf', 
              isDownload: true 
            }
          ]
        },
        { name: 'Premera Floor Coatings', href: '/vendors/premera-floor-coatings' },
        { name: 'Endurable Floor Coatings', href: '/vendors/endurable-floor-coatings' },
        { name: 'Rustoleum', href: '/vendors/rustoleum' },
        { name: 'Zinsser', href: '/vendors/zinsser' },
        { name: 'International Paints', href: '/vendors/international-paints' },
        { name: 'Devoe Coatings', href: '/vendors/devoe-coatings' }
      ]
    },
    { name: 'Contact', href: '/contact' }
  ];

  const getTextColor = () => {
    if (isXs && location.pathname === '/') return 'text-white';
    if (location.pathname === '/shop') return 'text-ivory';
    if (location.pathname === '/contact') return 'text-ivory';
    if (isLightPage) return 'text-charcoal';
    return 'text-ivory';
  };

  const getHoverColor = () => {
    return 'hover:text-gold';
  };

  const textColorClass = getTextColor();
  const hoverColorClass = getHoverColor();

  const handlePdfDownload = (href: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav className="navbar fixed top-0 left-0 right-0 z-[100] w-full overflow-visible px-1 xs:px-2 sm:px-4 md:px-6 py-1.5 xs:py-2 sm:py-3 md:py-4 transition-all duration-300">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-charcoal/90 before:via-charcoal/80 before:to-charcoal/90 before:backdrop-blur-md before:rounded-2xl before:opacity-95 before:shadow-2xl before:shadow-black/20 before:h-full before:-z-10 py-1 xs:py-1.5 sm:py-2.5 px-1 xs:px-1.5 sm:px-2">
          {/* Logo */}
          <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-3 relative z-50 flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-3 md:space-x-4 group min-w-0">
              <div className="relative overflow-hidden rounded-lg xs:rounded-xl shadow-lg bg-gradient-to-br from-charcoal/60 to-charcoal/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-gold/20 p-[1.5px] xs:p-[2px] sm:p-[3px] flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/80 via-gold/30 to-gold/80 rounded-lg xs:rounded-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="relative bg-charcoal/90 rounded-md xs:rounded-lg p-0.5 xs:p-1 sm:p-1.5 overflow-hidden">
                  <img
                    src="/logos/logo.png"
                    alt="Pinnacle Paints"
                    className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8 md:h-9 md:w-9 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg flex-shrink-0"
                  />
                </div>
              </div>
              <div className="flex flex-col min-w-0 flex-shrink">
                <span className="text-xs xs:text-sm sm:text-lg md:text-xl font-bold tracking-wide text-white drop-shadow-lg transition-all duration-300 group-hover:text-gold/90 truncate">
                  Pinnacle Paints
                </span>
                <span className="text-[0.5rem] xs:text-[0.6rem] sm:text-xs font-medium text-gold/90 tracking-wider uppercase opacity-90 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  Premium Finishes
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <div key={item.name} className="relative group z-50">
                {item.dropdown ? (
                  <div
                    className={`relative px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg ${textColorClass} font-medium transition-all duration-200 text-sm xl:text-base cursor-pointer hover:bg-gold/5 ${hoverColorClass} flex items-center space-x-1`}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 group-hover:rotate-180" />

                    <div className={`absolute top-full left-0 mt-2 w-56 bg-charcoal border border-gold/40 rounded-lg shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-200 z-[60] ${
                      activeDropdown === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.98) 0%, rgba(45, 55, 72, 0.95) 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                    }}>
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <div key={dropdownItem.name} className="relative group/sub">
                            {dropdownItem.hasSubDropdown ? (
                              <div
                                className="flex items-center justify-between px-4 py-2 text-sm text-ivory hover:text-gold hover:bg-gold/10 transition-all duration-200 cursor-pointer"
                                onMouseEnter={() => setActiveSubDropdown(dropdownItem.name)}
                                onMouseLeave={() => setActiveSubDropdown(null)}
                              >
                                <span>{dropdownItem.name}</span>
                                <ChevronRight className="w-3 h-3" />

                                <div className={`absolute left-full top-0 ml-1 w-64 bg-charcoal border border-gold/40 rounded-lg shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-200 z-[70] ${
                                  activeSubDropdown === dropdownItem.name ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'
                                }`}
                                style={{
                                  background: 'linear-gradient(135deg, rgba(45, 55, 72, 0.98) 0%, rgba(45, 55, 72, 0.95) 100%)',
                                  backdropFilter: 'blur(20px) saturate(180%)',
                                  WebkitBackdropFilter: 'blur(20px) saturate(180%)'
                                }}>
                                  <div className="py-2">
                                    {dropdownItem.subDropdown?.map((subItem) => (
                                      <button
                                        key={subItem.name}
                                        onClick={() => {
                                          if (subItem.isDownload) {
                                            handlePdfDownload(subItem.href, subItem.name);
                                          } else {
                                            window.location.href = subItem.href;
                                          }
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-ivory hover:text-gold hover:bg-gold/10 transition-all duration-200"
                                      >
                                        <div className="flex flex-col">
                                          <span className="font-medium">{subItem.name}</span>
                                          {subItem.description && (
                                            <span className="text-xs text-ivory/60 mt-0.5">{subItem.description}</span>
                                          )}
                                        </div>
                                        {subItem.isDownload && <Download className="w-3 h-3 ml-auto" />}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Link
                                to={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-ivory hover:text-gold hover:bg-gold/10 transition-all duration-200"
                              >
                                {dropdownItem.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`relative group overflow-hidden px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg ${textColorClass} font-medium transition-all duration-200 text-sm xl:text-base ${
                      location.pathname === item.href
                      ? 'text-gold bg-gold/10 font-semibold'
                      : `hover:bg-gold/5 ${hoverColorClass}`
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {location.pathname === item.href && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold/50 via-gold to-gold/50 shadow-sm shadow-gold/30"></span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons & CTA */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className={`relative p-2 xl:p-2.5 rounded-lg transition-all duration-300 hover:bg-gold/10 ${textColorClass} ${hoverColorClass}`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 xl:w-6 xl:h-6 transition-transform duration-200 hover:scale-110" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs font-bold rounded-full h-5 w-5 xl:h-6 xl:w-6 flex items-center justify-center shadow-lg transition-all duration-200">
                  {cartItemCount}
                </span>
              )}
            </button>

            <Link to="/signup">
              <Button size="sm" className="bg-gradient-to-r from-gold/80 to-gold hover:from-gold hover:to-gold/90 text-charcoal font-medium text-xs xl:text-sm px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile/Tablet Auth Buttons */}
          <div className="flex lg:hidden items-center space-x-0.5 xs:space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className={`relative p-1 xs:p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:bg-gold/10 ${textColorClass} ${hoverColorClass} flex-shrink-0`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 transition-transform duration-200 hover:scale-110" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gold text-charcoal font-bold rounded-full h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-5 sm:w-5 flex items-center justify-center shadow-lg transition-all duration-200 text-[7px] xs:text-[8px] sm:text-xs">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            <Link to="/signup" className="hidden xs:block sm:block flex-shrink-0">
              <Button size="sm" className="bg-gradient-to-r from-gold/80 to-gold hover:from-gold hover:to-gold/90 text-charcoal font-semibold text-[0.6rem] xs:text-[0.65rem] sm:text-xs px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 min-w-0">
                <span className="truncate">Sign Up</span>
              </Button>
            </Link>

            <button
              className={`${textColorClass} p-1 xs:p-1.5 sm:p-2 rounded-lg hover:bg-gold/10 transition-all duration-200 flex-shrink-0`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={16} className="text-gold xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Menu size={16} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu - Full Page */}
      <div className={`lg:hidden fixed inset-0 z-50 bg-gradient-to-b from-charcoal to-charcoal/95 backdrop-blur-lg transform transition-all duration-500 ease-out overflow-y-auto ${
        isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        <div className="flex flex-col min-h-screen max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between pt-6 pb-4 border-b border-gold/30">
            <div className="flex items-center space-x-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-charcoal to-charcoal/90 p-[2px] border border-gold/30 shadow-lg flex items-center justify-center">
                  <img 
                    src="/logos/logo.png" 
                    alt="Pinnacle Paints" 
                    className="h-7 w-7"
                  />
                </div>
                <span className="font-bold text-xl text-gold">
                  Pinnacle Paints
                </span>
              </Link>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gold p-2 rounded-lg hover:bg-gold/10 transition-all duration-200"
              aria-label="Close mobile menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center py-6">
            <div className="grid grid-cols-1 gap-2 py-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        className="w-full text-left text-ivory font-medium py-4 px-4 rounded-lg transition-all duration-300 text-lg hover:bg-gold/5 hover:text-gold flex items-center justify-between"
                        onClick={() => setMobileDropdowns(prev => ({
                          ...prev,
                          [item.name]: !prev[item.name]
                        }))}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                          mobileDropdowns[item.name] ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {mobileDropdowns[item.name] && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <div key={dropdownItem.name}>
                              {dropdownItem.hasSubDropdown ? (
                                <div>
                                  <button
                                    className="w-full text-left text-ivory/80 font-medium py-3 px-4 rounded-lg transition-all duration-300 text-base hover:bg-gold/5 hover:text-gold flex items-center justify-between"
                                    onClick={() => setMobileSubDropdowns(prev => ({
                                      ...prev,
                                      [dropdownItem.name]: !prev[dropdownItem.name]
                                    }))}
                                  >
                                    <span>{dropdownItem.name}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                                      mobileSubDropdowns[dropdownItem.name] ? 'rotate-180' : ''
                                    }`} />
                                  </button>

                                  {mobileSubDropdowns[dropdownItem.name] && (
                                    <div className="ml-4 mt-1 space-y-1">
                                      {dropdownItem.subDropdown?.map((subItem) => (
                                        <button
                                          key={subItem.name}
                                          onClick={() => {
                                            if (subItem.isDownload) {
                                              handlePdfDownload(subItem.href, subItem.name);
                                            } else {
                                              window.location.href = subItem.href;
                                            }
                                            setIsMobileMenuOpen(false);
                                          }}
                                          className="w-full text-left flex items-center gap-2 text-ivory/70 font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm hover:bg-gold/5 hover:text-gold"
                                        >
                                          {subItem.isDownload && <Download className="w-3 h-3" />}
                                          <div className="flex flex-col">
                                            <span>{subItem.name}</span>
                                            {subItem.description && (
                                              <span className="text-xs text-ivory/50">{subItem.description}</span>
                                            )}
                                          </div>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Link
                                  to={dropdownItem.href}
                                  className="block text-ivory/80 font-medium py-3 px-4 rounded-lg transition-all duration-300 text-base hover:bg-gold/5 hover:text-gold hover:translate-x-1"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {dropdownItem.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block text-ivory font-medium py-4 px-4 rounded-lg transition-all duration-300 text-lg ${
                        location.pathname === item.href
                          ? 'bg-gradient-to-r from-gold/30 to-gold/10 text-gold border-l-2 border-gold shadow-sm shadow-gold/20'
                          : 'hover:bg-gold/5 hover:text-gold hover:translate-x-1'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-8 pb-10 border-t border-gold/20 bg-gradient-to-b from-transparent to-gold/5">
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => {
                    dispatch({ type: 'TOGGLE_CART' });
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full max-w-xs bg-charcoal/90 hover:bg-charcoal text-ivory font-semibold text-base rounded-lg py-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>View Cart</span>
                  {cartItemCount > 0 && (
                    <span className="bg-gold text-charcoal text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </button>

                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="w-full max-w-xs">
                  <Button className="w-full bg-gradient-to-r from-gold/90 to-gold hover:from-gold hover:to-gold/90 text-charcoal font-semibold text-base rounded-lg py-3 shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300">
                    Sign Up
                  </Button>
                </Link>
                <div className="pt-6 flex justify-center">
                  <span className="text-sm text-gold/70">© 2025 Pinnacle Paints</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;