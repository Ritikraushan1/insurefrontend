import { useEffect, useState } from "react";
import CategoryCard from "../Cards/CategoryCard";
import { CategoryService } from "../../api/categoryApi";

const CategorySection = () => {
  const [category, setCategory] = useState([])

  useEffect(()=>{
    const fetchCategory = async()=>{
      const response = await CategoryService.getAllCategory();
      setCategory(response.data.categories)
    }
    fetchCategory()
  },[])
  return (
    <div className="container mt-5">
      {/* Section Title */}
      <h2 className="text-center mb-4">We Provide Insurance</h2>

      {/* Category Cards */}
      <div className="row">
        {category.map((item) => (
          <div className="col-12 col-md-4 mb-4" key={item.id}>
            <CategoryCard
              category={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
