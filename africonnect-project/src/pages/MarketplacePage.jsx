import MarketplaceGrid from '../../components/MarketplaceGrid'

function MarketplacePage(){
    return(
        <div>
            {/*HERO SECTION */}
            <section className="hero">
                <h>Empowering African Industry through sustainable innovation & streamlined production.</h>
                <p>The premium B2B gateway connecting global institutional buyers with verified, high-capicity African producers.</p>
            <div className="badge">
                <span>500+</span> Verified Industrial Suppliers
            </div>
            <div className="hero-img">
                <img src ="/assets/hero-cocoa.jpg" alt="Cocoa farm"/>
            </div>
            </section>

            {/*MARKETPLACE GRID*/}
            <MarketplaceGrid />
            </div>

    )
}

export default MarketplacePage