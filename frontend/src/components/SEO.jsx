import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} | catcatchcode</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

SEO.defaultProps = {
  title: 'Learn to Code',
  description: 'Master coding with the best courses and AI resources on catcatchcode.',
  keywords: 'coding, programming, web development, AI, react, nodejs',
};

export default SEO;
